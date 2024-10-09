import * as vscode from "vscode";

const diagnosticCollection =
  vscode.languages.createDiagnosticCollection("java");

// Fonction pour vérifier l'initialisation des variables
export function checkVariableInitialization(
  document: vscode.TextDocument
): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();
  const variableRegex = /\b(\w+)\s*=\s*[^;]*;/g; // Regex pour matcher les déclarations de variables
  const usedVariableRegex = /\b(\w+)\b(?!\s*=\s*[^;]*;)/g; // Regex pour matcher l'utilisation des variables

  const declaredVariables: Set<string> = new Set();

  // Trouver les variables initialisées
  let match;
  while ((match = variableRegex.exec(text))) {
    const variableName = match[1];
    declaredVariables.add(variableName);
  }

  // Vérifier si une variable est utilisée
  const lines = text.split("\n");
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber].trim();

    // Ignorer les lignes commentées
    if (line.startsWith("//")) {
      continue;
    }

    // Ignorer les déclarations de classe et les mots-clés comme int, void, etc.
    const keywords = [
      "class",
      "int",
      "void",
      "return",
      "double",
      "String",
      "float",
      "byte",
      "boolean",
      "if",
      "else",
      "for",
      "while",
      "do",
      "switch",
      "case",
      "break",
      "continue",
      "try",
      "catch",
      "finally",
    ];
    if (keywords.some((keyword) => line.startsWith(keyword))) {
      continue;
    }

    // Ignore les chiffres et les chaînes
    const stringRegex = /"(?:[^"\\]|\\.)*"/; // Regex pour matcher les chaînes de caractères
    if (stringRegex.test(line)) {
      continue;
    }

    let usedMatch;
    while ((usedMatch = usedVariableRegex.exec(line))) {
      const usedVariableName = usedMatch[1];

      // Vérifiez si la variable est déclarée dans les déclarations ou si c'est une méthode
      if (
        !declaredVariables.has(usedVariableName) &&
        !text.includes(` ${usedVariableName}(`)
      ) {
        const startPosition = new vscode.Position(lineNumber, usedMatch.index);
        const endPosition = new vscode.Position(
          lineNumber,
          usedMatch.index + usedVariableName.length
        );

        // Diagnostic si la variable n'est jamais initialisée
        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(startPosition, endPosition),
          "variable not init",
          vscode.DiagnosticSeverity.Warning // erreur
        );

        diagnostics.push(diagnostic);
      }
    }
  }

  return diagnostics;
}

// Fonction pour mettre à jour les diagnostics
export function updateDiagnostics(document: vscode.TextDocument) {
  if (document.languageId === "java") {
    const diagnostics = checkVariableInitialization(document);
    diagnosticCollection.set(document.uri, diagnostics);
  } else {
    diagnosticCollection.delete(document.uri);
  }
}
