import * as vscode from "vscode";

// Fournisseur de définitions pour les variables et fonctions
export const provider = vscode.languages.registerDefinitionProvider("java", {
  provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);

    const definitions: vscode.Location[] = [];
    const text = document.getText();

    // Regex pour matcher uniquement les fonctions définies par l'utilisateur
    const funcRegex = new RegExp(`\\b${word}\\s*\\(\\s*\\)\\s*{`, "g");
    let match;

    // Trouver les définitions de fonctions
    while ((match = funcRegex.exec(text))) {
      const start = document.positionAt(match.index);
      definitions.push(
        new vscode.Location(
          document.uri,
          new vscode.Range(
            start.line,
            start.character,
            start.line,
            start.character + match[0].length
          )
        )
      );
    }

    // Recherche des définitions de variables
    const varRegex = new RegExp(`\\b${word}\\b(?!\\s*\\()`, "g"); // Exclut les fonctions
    while ((match = varRegex.exec(text))) {
      const start = document.positionAt(match.index);
      definitions.push(
        new vscode.Location(
          document.uri,
          new vscode.Range(
            start.line,
            start.character,
            start.line,
            start.character + word.length
          )
        )
      );
    }

    // Retourner les définitions trouvées
    return definitions.length > 0 ? definitions : null;
  },
});
