import * as vscode from "vscode";
import { getFileInfo } from "../utils/getFileInfos";
//const cmd = require("../../CustomCommand.json");
// Commande pour executer une commande de terminal custom
export let execCustomCommand = vscode.commands.registerCommand(
  "extension.CustomCommand",
  () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const { name, extend, directory } = getFileInfo(editor);
      const config = vscode.workspace.getConfiguration("ijava");
      const cmd = config.get<string>("CustomCommand");
      const commande = (cmd ?? "echo aucune commande custom trouvé.")
        .replace(/%file%/g, name)
        .replace(/%extend%/g, extend)
        .replace(/%directory%/g, directory);
      const terminal =
        vscode.window.activeTerminal || vscode.window.createTerminal();
      terminal.show();
      terminal.sendText(commande);
    }
  }
);
