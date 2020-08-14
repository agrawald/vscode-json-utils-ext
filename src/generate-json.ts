import * as jsf from "json-schema-faker";
import * as vscode from "vscode";
import { writeFile } from "./common";

export default async function generateJson() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage("No folder or workspace opened");
    return;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No JSON schema file opened");
    return;
  }

  const document = editor.document;
  const jsonSchema = document.getText();
  const faked = jsf.generate(JSON.parse(jsonSchema));
  const fileUri = await writeFile(
    "generatedJson.mock.json",
    JSON.stringify(faked)
  );
  if (fileUri) {
    vscode.window.showTextDocument(fileUri);
  }

  vscode.window.showInformationMessage(`Mock JSON Generated. ${fileUri}`);
}
