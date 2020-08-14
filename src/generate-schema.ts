import * as toJsonSchema from "to-json-schema";
import * as vscode from "vscode";
import { writeFile } from "./common";

export default async function generateSchema() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage("No folder or workspace opened");
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No JSON file opened");
    return;
  }

  const document = editor.document;
  const json = document.getText();
  const jsonSchema = toJsonSchema(JSON.parse(json));
  const fileUri = await writeFile(
    "generatedSchema.json",
    JSON.stringify(jsonSchema)
  );
  if (fileUri) {
    vscode.window.showTextDocument(fileUri);
  }

  vscode.window.showInformationMessage(`JSON Schema Generated. ${fileUri}`);
}
