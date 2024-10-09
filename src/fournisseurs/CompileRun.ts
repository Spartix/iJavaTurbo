import * as vscode from "vscode";
// Commande pour compiler et exécuter le fichier
export let disposableCompileAndRun = vscode.commands.registerCommand(
  "extension.compileAndRun",
  async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const fileName = editor.document.fileName;
      const terminal =
        vscode.window.activeTerminal || vscode.window.createTerminal();
      terminal.show();
      terminal.sendText(
        `ijavac ${fileName} && ijava ${fileName.split(".").slice(0, -1)}`
      );
    }
  }
);
