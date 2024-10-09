import * as vscode from "vscode";

// Commande pour insérer automatiquement la classe
export let disposableInsertClass = vscode.commands.registerCommand(
  "extension.insertPgClass",
  () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor
        .edit((editBuilder) => {
          const fileDirectory = editor.document.fileName;
          let fileName = fileDirectory;
          if (fileName.includes("/")) {
            fileName = fileName.split("/")[fileName.split("/").length - 1];
          }
          if (fileName.includes("\\")) {
            fileName = fileName.split("\\")[fileName.split("\\").length - 1];
          }
          const extension = fileName.split(".")[fileName.split(".").length - 1];
          if (fileName.includes(".")) {
            fileName = fileName.split(".")[fileName.split(".").length - 2];
          }
          const position = editor.selection.active;
          editBuilder.insert(
            position,
            `class ${fileName} extends Program {\n    void algorithm() {\n        \n    }\n}`
          );
        })
        .then(() => {
          const position = new vscode.Position(2, 7); // ligne 3, colonne 8
          editor.selection = new vscode.Selection(position, position);
          editor.revealRange(new vscode.Range(position, position));
        });
    }
  }
);
