import * as vscode from "vscode";
import { loadFunctionsData } from "./utils/loadfunctions";
// Fournisseur pour complet pour for/while/if et functions
export const completionProvider =
  vscode.languages.registerCompletionItemProvider("java", {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const completionItems: vscode.CompletionItem[] = [];

      const ifItem = new vscode.CompletionItem(
        "if",
        vscode.CompletionItemKind.Snippet
      );
      ifItem.insertText = new vscode.SnippetString(
        "if (${1:condition}) {\n\t$0\n}"
      );
      completionItems.push(ifItem);

      const forItem = new vscode.CompletionItem(
        "for",
        vscode.CompletionItemKind.Snippet
      );
      forItem.insertText = new vscode.SnippetString(
        "for (${1:int i = 0}; ${2:i < length}; ${3:i++}) {\n\t$0\n}"
      );
      completionItems.push(forItem);

      const whileItem = new vscode.CompletionItem(
        "while",
        vscode.CompletionItemKind.Snippet
      );
      whileItem.insertText = new vscode.SnippetString(
        "while (${1:condition}) {\n\t$0\n}"
      );
      completionItems.push(whileItem);

      // Suggestions pour readInt, readChar, etc.
      const functions = loadFunctionsData().map((item) => item.name);
      for (const func of functions) {
        const item = new vscode.CompletionItem(
          func,
          vscode.CompletionItemKind.Function
        );
        item.insertText = new vscode.SnippetString(`${func}($1)`);
        completionItems.push(item);
      }

      return completionItems;
    },
  });
