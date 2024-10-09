import * as vscode from "vscode";
import { disposableCompileAndRun } from "./commands/CompileRun";
import { disposableInsertClass } from "./commands/InsertClass";
import { completionProvider } from "./complet";
import { provider } from "./fournisseurs/References";
import { commentline } from "./commands/Comment";
import { execCustomCommand } from "./commands/customsCommands";
import { hoverProvider } from "./fournisseurs/FunctionInfos";
import { updateDiagnostics } from "./fournisseurs/Correction";

export function activate(context: vscode.ExtensionContext) {
  //lorsque l'extension est installer ca demande un reload

  const config = vscode.workspace.getConfiguration("iJavaTurbo");
  const isFirstInstall = config.get("firstInstall", true);

  if (isFirstInstall) {
    vscode.window
      .showInformationMessage(
        "L'extension a été installée avec succès. Redémarrez VS Code pour appliquer les modifications.",
        { modal: true },
        "Redémarrer"
      )
      .then((selection) => {
        config.update("firstInstall", false, vscode.ConfigurationTarget.Global);

        if (selection === "Redémarrer") {
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  }

  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(provider);
  context.subscriptions.push(disposableInsertClass);
  context.subscriptions.push(disposableCompileAndRun);
  context.subscriptions.push(completionProvider);
  context.subscriptions.push(execCustomCommand);
  context.subscriptions.push(commentline);
  vscode.window.showInformationMessage("iJava extension activated");

  // Diagnostic pour les erreurs
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      updateDiagnostics(event.document);
    })
  );

  // Initialiser les diagnostics au démarrage
  vscode.workspace.textDocuments.forEach((doc) => {
    updateDiagnostics(doc);
  });
}

export function deactivate() {}
