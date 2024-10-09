import * as vscode from "vscode";
// Fournisseur de def pour les variables et functions
export const provider = vscode.languages.registerDefinitionProvider("java", {
  provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);

    const definitions: vscode.Location[] = [];
    const text = document.getText();

    // Regex pour matcher uniquement les fonctions
    const regex = new RegExp(`\\b${word}\\b\\s*\\(`, "g");
    let match;

    // Trouver les def de fonctions
    while ((match = regex.exec(text))) {
      const start = document.positionAt(match.index);
      const end = document.positionAt(match.index + match[0].length);
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

    // Retourner les def trouvées
    return definitions.length > 0 ? definitions : null;
  },
});
