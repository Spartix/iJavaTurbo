import * as vscode from "vscode";

// Fournisseur de définitions pour les variables et fonctions
export const provider = vscode.languages.registerDefinitionProvider("java", {
  provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);

    const definitions: vscode.Location[] = [];
    const text = document.getText();

    // Regex pour matcher les decla de fonctions
    const funcRegex = new RegExp(`\\b${word}\\s*\\(.*?\\)\\s*{`, "g");
    let match;

    // Trouver les def de fonctions
    while ((match = funcRegex.exec(text))) {
      const startIndex = match.index;
      const startPosition = document.positionAt(startIndex);

      // Generate la loc pour la fonction
      definitions.push(
        new vscode.Location(
          document.uri,
          new vscode.Range(
            startPosition.line,
            startPosition.character, // Start
            startPosition.line,
            startPosition.character + match[0].length // end
          )
        )
      );
    }

    // Regex pour les dec de var
    const varRegex = new RegExp(`\\b(${word})\\s*=[^;]*;`, "g"); // Exclut les fonctions
    while ((match = varRegex.exec(text))) {
      const startIndex = match.index;
      const startPosition = document.positionAt(startIndex);

      // loc de la var
      definitions.push(
        new vscode.Location(
          document.uri,
          new vscode.Range(
            startPosition.line,
            startPosition.character, // start
            startPosition.line,
            startPosition.character + match[0].length // end
          )
        )
      );
    }

    //retour des def
    return definitions.length > 0 ? definitions : null;
  },
});
