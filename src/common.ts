import * as vscode from "vscode";
import { posix } from "path";

export async function writeFile(fileName: string, data: string): Promise<vscode.Uri | undefined> {
  if (vscode.workspace.workspaceFolders) {
    const writeData = Buffer.from(data, "utf8");
    const folderUri = vscode.workspace.workspaceFolders[0].uri;
    const fileUri = folderUri.with({
      path: posix.join(folderUri.path, "validateSchema-errors.json"),
    });
    await vscode.workspace.fs.writeFile(fileUri, writeData);
    return fileUri;
  }
}
