import * as vscode from "vscode";
import { GetRegex, isClose } from "../utils/BracketsClose";

// Couleur rouge de surbrillance
const errorDecoration = vscode.window.createTextEditorDecorationType({
  border: "2px solid red",
  backgroundColor: "rgba(255, 0, 0, 0.2)",
  color: "red",
  fontWeight: "bold",
});

export function brackClose(documents: vscode.TextDocument) {
  const texte = documents.getText();
  const MatchedArray = GetRegex(texte);
  let rez = isClose(MatchedArray);

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  // console.log(rez);

  // Si la fonction retourne false, appliquez la deco d'erreur
  if (!rez) {
    // rez = parseInt(rez.toString());
    // let ligne = getLine(texte, rez);
    // if (!ligne) return;
    const fullRange = new vscode.Range(0, 0, documents.lineCount, 0);
    // Error sur toutes la page
    editor.setDecorations(errorDecoration, [fullRange]);

    // vscode.window.showErrorMessage(
    //   "Erreur parenthese"
    // );
  } else {
    // Supprimer si tout est correct
    editor.setDecorations(errorDecoration, []);
  }
}
