import * as vscode from "vscode";
import * as Ajv from "ajv";
import { posix } from "path";
import { writeFile } from "./common";

export default async function validateSchema() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage("No folder or workspace opened");
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No JSON schema file opened");
    return;
  }

  if (editor) {
    const ajv = new Ajv({
      schemaId: "auto",
    });
    ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
    ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
    const document = editor.document;
    const jsonSchema = document.getText();
    if (ajv.validateSchema(JSON.parse(jsonSchema))) {
      vscode.window.showInformationMessage("JSON schema is valid.");
      return;
    }

    console.log(JSON.stringify(ajv.errors));
    const fileUri = await writeFile(
      "validateSchema.errors.json",
      JSON.stringify(ajv.errors)
    );
    if (fileUri) {
      vscode.window.showTextDocument(fileUri);
    }

    vscode.window.showErrorMessage(`JSON schema is invalid. ${fileUri}`);
    return;
  }
}
