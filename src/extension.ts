import * as vscode from "vscode";
import { disposableCompileAndRun } from "./fournisseurs/CompileRun";
import { disposableInsertClass } from "./commands/InsertClass";
import { completionProvider } from "./complet";
import { provider } from "./fournisseurs/References";
import { commentline } from "./commands/Comment";
import { execCustomCommand } from "./commands/customsCommands";
import { hoverProvider } from "./fournisseurs/FunctionInfos";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(provider);
  context.subscriptions.push(disposableInsertClass);
  context.subscriptions.push(disposableCompileAndRun);
  context.subscriptions.push(completionProvider);
  context.subscriptions.push(execCustomCommand);
  context.subscriptions.push(commentline);
  vscode.window.showInformationMessage("iJava extension activated");
}

export function deactivate() {}
