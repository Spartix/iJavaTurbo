import * as vscode from "vscode";
// C'est pour voir si isEditing (c'est guetto mybad)
let isEditing = false;

export function addPoints(documents: vscode.TextDocument) {
  if (isEditing) {
    return;
  }

  const text = documents.getText().split("\n");
  const updatedText = text.map((line) => {
    const trimmedLine = line.trim();
    const leadingSpacesMatch = line.match(/^\s*/); // espace du debut de ligne
    const leadingSpaces = leadingSpacesMatch ? leadingSpacesMatch[0] : "";
    const hasSemicolon = trimmedLine.endsWith(";");
    const isComment = trimmedLine.startsWith("//");
    const endsWithSpecialChar = /[^\w\s)]$/.test(trimmedLine); // special char

    // Si la ligne ne contient pas dja un ;, ne commence pas par // et ne finit pas par un caractère spécial sauf ")"
    if (
      !hasSemicolon &&
      !isComment &&
      !endsWithSpecialChar &&
      trimmedLine !== ""
    ) {
      return leadingSpaces + trimmedLine + ";";
    }
    return line;
  });

  const newText = updatedText.join("\n");

  if (documents.getText() !== newText) {
    isEditing = true;
    const edit = new vscode.TextEdit(
      new vscode.Range(0, 0, documents.lineCount, 0),
      newText
    );
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.set(documents.uri, [edit]);
    vscode.workspace.applyEdit(workspaceEdit).then(() => {
      isEditing = false;
    });
  }
}
