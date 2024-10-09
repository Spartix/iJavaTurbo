import * as vscode from "vscode";
import { loadFunctionsData } from "../utils/loadfunctions";

// Fournisseur quand fonction survolée
export const hoverProvider = vscode.languages.registerHoverProvider("java", {
  provideHover(document, position, token) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);
    const functionsData = loadFunctionsData(); // Charger les données des fonctions
    const functionInfo = functionsData.find((func) => func.name === word);

    if (functionInfo) {
      // contenu de l'infobulle
      const markdownString = new vscode.MarkdownString();
      markdownString.supportHtml = true;
      // Formater les args pour afficher

      const formattedArgs = functionInfo.args
        .map(
          (arg) =>
            `<span style="color:#6A5ACD;">${
              arg.type
            }</span> <span style="color:#FFD700;">${
              arg.name
            }</span> <span style="color:#FF4500;">${
              arg.required ? " (required)" : ""
            }</span>`
        )
        .join(", ");
      // .replace(/true/g, "required")
      // .replace(/false/g, "");

      // Signature de la fonction
      // markdownString.appendCodeblock(
      //   `${functionInfo.return} ${functionInfo.name}(${formattedArgs})`,
      //   "java"
      // );
      markdownString.appendMarkdown(
        `<span style="color:#6A5ACD;">${functionInfo.return}</span> <span style="color:#FFD700;">${functionInfo.name}</span>(${formattedArgs})`
      );

      // Description de la fonction
      markdownString.appendMarkdown(`\n\n${functionInfo.description}`);

      return new vscode.Hover(markdownString);
    }

    return null;
  },
});
