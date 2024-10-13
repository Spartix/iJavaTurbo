import * as vscode from "vscode";
import { loadFunctionsData } from "../utils/loadfunctions";
import { InterfaceArg } from "../interfaces/functionsInterface";

// Fournisseur quand fonction survolée
export const hoverProvider = vscode.languages.registerHoverProvider("java", {
  provideHover(document, position, token) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);
    const functionsData = loadFunctionsData();
    const userDefinedFunctions = extractUserFunctions(document.getText());
    const allFunctions = [...functionsData, ...userDefinedFunctions];
    const functionInfo = allFunctions.find((func) => func.name === word);

    if (functionInfo) {
      // contenu de l'infobulle
      const markdownString = new vscode.MarkdownString();
      markdownString.supportHtml = true;


      const formattedArgs = functionInfo.args
        .map(
          (arg: InterfaceArg) =>
            `<span style="color:#6A5ACD;">${
              arg.type
            }</span> <span style="color:#FFD700;">${
              arg.name
            }</span> <span style="color:#FF4500;">${
              arg.required ? " (required)" : ""
            }</span>`
        )
        .join(", ");


      markdownString.appendMarkdown(
        `<span style="color:#6A5ACD;">${functionInfo.return}</span> <span style="color:#FFD700;">${functionInfo.name}</span>(${formattedArgs})`
      );


      if (functionInfo.description) {
        markdownString.appendMarkdown(`\n\n${functionInfo.description}`);
      }

      return new vscode.Hover(markdownString);
    }

    return null;
  },
});


function extractUserFunctions(text: string): Array<any> {
  const functionRegex = /(\w+)\s+(\w+)\s*\(([^)]*)\)\s*{/g;
  const functions = [];

  let match;
  while ((match = functionRegex.exec(text))) {
    const returnType = match[1]; 
    const functionName = match[2]; 
    const params = match[3]; 


    const args = params.split(",").map((param) => {
      const [type, name] = param.trim().split(/\s+/);
      return {
        name: name || "",
        type: type || "",
        required: true,
      };
    });

    functions.push({
      name: functionName,
      return: returnType,
      args: args,
      description: `Fonction utilisateur ${functionName}`,
    });
  }

  return functions;
}
