import * as vscode from "vscode";
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
      const functions = [
        "abs",
        "acos",
        "asin",
        "actionPerformed",
        "addButton",
        "addZone",
        "assertArrayEquals",
        "assertArrayNotEquals",
        "assertEquals",
        "assertFalse",
        "assertGreaterThan",
        "assertGreaterThanOrEqual",
        "assertLessThan",
        "assertLessThanOrEqual",
        "assertNotEquals",
        "assertTrue",
        "atan",
        "atan2",
        "automaticRefresh",
        "background",
        "backward",
        "cbrt",
        "ceil",
        "changeButton",
        "charAt",
        "charToInt",
        "clearBOL",
        "clearEOL",
        "clearLine",
        "clearScreen",
        "close",
        "columnCount",
        "compare",
        "copyAndResize",
        "copySign",
        "cos",
        "cosh",
        "curp",
        "cursor",
        "cusp",
        "delay",
        "down",
        "drawImage",
        "drawLine",
        "drawOval",
        "drawRect",
        "drawString",
        "enableKeyTypedInConsole",
        "equals",
        "error",
        "exp",
        "expm1",
        "fill",
        "fillOval",
        "fillRect",
        "floor",
        "forward",
        "get",
        "getAllFilesFromCurrentDirectory",
        "getAllFilesFromDirectory",
        "getAllFontNames",
        "getCell",
        "getColumns",
        "getExponent",
        "getHeight",
        "getLines",
        "getName",
        "getStringLength",
        "getTime",
        "getWidth",
        "hide",
        "hypot",
        "IEEEremainder",
        "length",
        "loadCSV",
        "log",
        "log10",
        "log1p",
        "max",
        "min",
        "mouseEvent",
        "newFile",
        "newImage",
        "nextAfter",
        "nextUp",
        "play",
        "playContinuously",
        "playMP3",
        "playSound",
        "pow",
        "print",
        "println",
        "random",
        "randomANSIColor",
        "randomColor",
        "read",
        "readChar",
        "readDouble",
        "readFloat",
        "readInt",
        "readLong",
        "readString",
        "ready",
        "refresh",
        "removeAllButtons",
        "removeAllZone",
        "removeButton",
        "removeZone",
        "reset",
        "rgb",
        "rgbColor",
        "rint",
        "round",
        "rowCount",
        "saveCSV",
        "scalb",
        "set",
        "setColor",
        "setFocus",
        "setGrid",
        "setMessage",
        "setName",
        "substring",
        "toUpperCase",
        "toLowerCase",
      ];
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
