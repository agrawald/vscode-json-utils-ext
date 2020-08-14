import * as vscode from "vscode";
import * as Ajv from "ajv";
import { posix } from "path";
import { writeFile } from "./common";

export default async function validateJsonAgainstSchema() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage("No folder or workspace opened");
    return;
  }

  const editors = vscode.window.visibleTextEditors;
  if (!editors) {
    vscode.window.showInformationMessage("No JSON schema and JSON file opened");
    return;
  }

  if (editors) {
    const ajv = new Ajv({
      schemaId: "auto",
    });
    ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
    ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
    const jsonSchemaDoc = editors[0].document;
    const jsonSchema = JSON.parse(jsonSchemaDoc.getText());
    const jsonDoc = editors[1].document;
    const json = JSON.parse(jsonDoc.getText());
    if (ajv.validate(jsonSchema, json)) {
      vscode.window.showInformationMessage(
        "JSON is valid against the JSON schema."
      );
      return;
    }

    console.log(JSON.stringify(ajv.errors));
    const fileUri = await writeFile(
      "validateJson.errors.json",
      JSON.stringify(ajv.errors)
    );
    if (fileUri) {
      vscode.window.showTextDocument(fileUri);
    }

    vscode.window.showErrorMessage(
      `JSON is not valid as per JSON schema. ${fileUri}`
    );
    return;
  }
}
