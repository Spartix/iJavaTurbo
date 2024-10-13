import * as vscode from "vscode";
import { disposableCompileAndRun } from "./commands/CompileRun";
import { disposableInsertClass } from "./commands/InsertClass";
import { completionProvider } from "./complet";
import { provider } from "./fournisseurs/References";
import { commentline } from "./commands/Comment";
import { execCustomCommand } from "./commands/customsCommands";
import { hoverProvider } from "./fournisseurs/FunctionInfos";
import {
  provideCompletionItems,
  updateDiagnostics,
} from "./fournisseurs/Correction";
import { addPoints } from "./fournisseurs/EndLines";

export function activate(context: vscode.ExtensionContext) {
  const isJavaFile = (document: vscode.TextDocument) =>
    document.languageId === "java";

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
  //vscode.window.showInformationMessage("iJava extension activated");

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: "java" },
      {
        provideCompletionItems,
      }
    )
  );

  // Diagnostic pour les erreurs lors des changements de texte dans le document
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (isJavaFile(event.document)) {
        updateDiagnostics(event.document);
      }
    })
  );

  // Diagnostic lors de l'ouverture d'un nouveau document
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (isJavaFile(document)) {
        updateDiagnostics(document);
      }
    })
  );

  // Initialiser les diagnostics pour tous les documents ouverts au démarrage de l'extension
  vscode.workspace.textDocuments.forEach((doc) => {
    if (isJavaFile(doc)) {
      updateDiagnostics(doc);
    }
  });

  // quand save add les ;
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      if (isJavaFile(document)) {
        addPoints(document);
      }
    })
  );
}

export function deactivate() {}
