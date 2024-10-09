import * as vscode from "vscode";
// Commande pour commenter/décommenter les lignes
export const commentline = vscode.commands.registerTextEditorCommand(
  "extension.toggleComment",
  (editor) => {
    editor.edit((editBuilder) => {
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      const startLine = selection.start.line;
      const endLine = selection.end.line;

      for (let i = startLine; i <= endLine; i++) {
        const line = editor.document.lineAt(i);
        const lineText = line.text;

        if (lineText.trim().startsWith("//")) {
          const newText = lineText.replace("// ", "").replace("//", "");
          editBuilder.replace(line.range, newText);
        } else {
          editBuilder.replace(line.range, "// " + lineText);
        }
      }
    });
  }
);
