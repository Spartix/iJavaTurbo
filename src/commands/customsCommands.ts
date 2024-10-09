import * as vscode from "vscode";
import { getFileInfo } from "../utils/getFileInfos";
const cmd = require("../../CustomCommand.json");
// Commande pour executer une commande de terminal custom
export let execCustomCommand = vscode.commands.registerCommand(
  "extension.CustomCommand",
  () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const { name, extend, directory } = getFileInfo(editor);
      const commande = cmd["commande"]
        .replace("%file%", name)
        .replace("%extend%", extend)
        .replace("%directory%", directory);
      const terminal =
        vscode.window.activeTerminal || vscode.window.createTerminal();
      terminal.show();
      terminal.sendText(commande);
    }
  }
);
