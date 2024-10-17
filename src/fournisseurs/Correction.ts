import * as vscode from "vscode";

const diagnosticCollection =
  vscode.languages.createDiagnosticCollection("java");

let initializedVariables: Set<string> = new Set(); // Liste des variables init

// Fonction pour vérifier l'init des variables
export function checkVariableInitialization(
  document: vscode.TextDocument
): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();

  // Regex pour matcher les déclarations de variables
  const variableRegex = /\b(\w+)\s*=\s*[^;]*;/g;
  // Regex pour matcher les paramètres de fonction
  const functionParamRegex = /\b(\w+)\s+(\w+)\s*\(([^)]*)\)/g;
  // Regex pour matcher l'utilisation des variables
  const usedVariableRegex = /\b(\w+)\b(?!\s*=\s*[^;]*;)/g;

  initializedVariables.clear();

  let match;
  while ((match = functionParamRegex.exec(text))) {
    const params = match[3].split(",");
    params.forEach((param) => {
      const paramName = param.trim().split(/\s+/).pop();
      if (paramName) {
        initializedVariables.add(paramName);
      }
    });
  }

  // Trouver les variables initialisées
  while ((match = variableRegex.exec(text))) {
    const variableName = match[1];
    initializedVariables.add(variableName);
  }

  const lines = text.split("\n");
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber].trim();

    // Ignorer les lignes commentées
    if (line.startsWith("//")) {
      continue;
    }

    // Ignorer les déclarations de classe et les mots-clés
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
      "final",
    ];
    if (
      keywords.some((keyword) => line.startsWith(keyword)) ||
      keywords.some((keyword) =>
        line.replace(/ /g, "").startsWith("}" + keyword)
      )
    ) {
      continue;
    }

    // Ignore les chiffres et les chaînes
    const stringRegex = /"(?:[^"\\]|\\.)*"/; // Regex pour matcher les chaînes de caractères
    if (stringRegex.test(line)) {
      continue;
    }

    let usedMatch: RegExpExecArray | null;
    while ((usedMatch = usedVariableRegex.exec(line))) {
      const usedVariableName = usedMatch[0];

      // Vérifie si ce n'est pas un nombre
      if (!isNaN(Number(usedVariableName))) {
        continue; // Ignore si c'est un chiffre
      }

      if (
        !initializedVariables.has(usedVariableName) &&
        !text.includes(` ${usedVariableName}(`)
      ) {
        const startPosition = new vscode.Position(lineNumber, usedMatch.index);
        const endPosition = new vscode.Position(
          lineNumber,
          usedMatch.index + usedVariableName.length
        );

        const diagnostic = new vscode.Diagnostic(
          new vscode.Range(startPosition, endPosition),
          `Variable "${usedVariableName}" not initialized`,
          vscode.DiagnosticSeverity.Warning // erreur
        );

        diagnostics.push(diagnostic);
      }
    }
  }

  return diagnostics;
}

// Fonction pour ajouter des suggestions de complétion
export function provideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.CompletionItem[] {
  const completionItems: vscode.CompletionItem[] = [];

  // Ajouter chaque variable initialisée à la complétion
  initializedVariables.forEach((variable) => {
    const completionItem = new vscode.CompletionItem(
      variable,
      vscode.CompletionItemKind.Variable
    );
    completionItems.push(completionItem);
  });

  return completionItems;
}

export function updateDiagnostics(document: vscode.TextDocument) {
  if (document.languageId === "java") {
    const diagnostics = checkVariableInitialization(document);
    diagnosticCollection.set(document.uri, diagnostics);
  } else {
    diagnosticCollection.delete(document.uri);
  }
}
