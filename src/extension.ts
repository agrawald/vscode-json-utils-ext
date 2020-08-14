// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import generateJson from "./generate-json";
import validateSchema from "./validate-schema";
import validateJsonAgainstSchema from "./validate-json";
import generateJsonSchema from "./generate-schema";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "jsonschemautils" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let schemaValidator = vscode.commands.registerCommand(
    "jsonschemautils.validateSchema",
    validateSchema
  );
  let jsonGenerator = vscode.commands.registerCommand(
    "jsonschemautils.generateJson",
    generateJson
  );
  let jsonValidator = vscode.commands.registerCommand(
    "jsonschemautils.validateJson",
    validateJsonAgainstSchema
  );
  let jsonSchemaGenerator = vscode.commands.registerCommand(
    "jsonschemautils.generateJsonSchema",
    generateJsonSchema
  );

  context.subscriptions.push(schemaValidator, jsonGenerator, jsonValidator, jsonSchemaGenerator);
}

// this method is called when your extension is deactivated
export function deactivate() {}
