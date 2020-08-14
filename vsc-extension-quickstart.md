# JSON Schema Utilities Extension

This extension will provide the following 3 menu `Ctrl + Shift + P` options

- JSON Utils: Validate JSON Schema
- JSON Utils: Generate Mock JSON
- JSON Utils: Generate JSON Schema
- JSON Utils: Validate JSON against JSON schema

## JSON Utils: Validate JSON Schema

This option when selected will try to valide the JSON schema (Active in the text editor) against following json-schema definations

> <http://json-schema.org/draft-04/schema>#
> <http://json-schema.org/draft-06/schema>#

In case of an invalid schema, the errors will be logged into a file, `validateSchema.errors.json` and will be saved in to the same location as the JSON schema.

## JSON Utils: Generate Mock JSON

This option when selected will create a mock JSON from JSON schema (active in the text editor)
The mock json file, `generatedJson.mock.json`, will be saved at the same location as the JSON schema.

## JSON Utils: Generate JSON Schema

This option when selected will create JSON schema (active in the text editor)
The mock json file, `generatedSchema.json`, will be saved at the same location as the JSON file.

## JSON Utils: Validate JSON against JSON Schema

For this action to work, the JSON schema file and JSON file should be open in the split text editor, and active. When this option is selected the JSON (right text editor) will be validated against the JSON schema (left text editor).

If errors, an error file, `validateJson.errors.json` will be saved in the same location as JSON file.