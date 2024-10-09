import * as vscode from "vscode";
const cmd = require("../../CustomCommand.json");
// Commande pour executer une commande de terminal custom
export let execCustomCommand = vscode.commands.registerCommand(
  "extension.CustomCommand",
  () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
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
      const commande = cmd["commande"]
        .replace("%file%", fileName)
        .replace("%extend%", extension)
        .replace("%directory%", fileDirectory);
      const terminal =
        vscode.window.activeTerminal || vscode.window.createTerminal();
      terminal.show();
      terminal.sendText(commande);
    }
  }
);
