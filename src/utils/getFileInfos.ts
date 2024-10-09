import { InterfaceFolder } from "../interfaces/InterfaceFilesInfo";
import * as vscode from "vscode";

export function getFileInfo(editor: vscode.TextEditor): InterfaceFolder {
  const fileDirectory = editor.document.fileName;
  let fileName = fileDirectory;
  if (fileName.includes("/")) {
    fileName = fileName.split("/")[fileName.split("/").length - 1];
  }
  if (fileName.includes("\\")) {
    fileName = fileName.split("\\")[fileName.split("\\").length - 1];
  }
  const extension = fileName.split(".")[fileName.split(".").length - 1];
  if (fileName.includes(".")) {
    fileName = fileName.split(".")[fileName.split(".").length - 2];
  }
  return { name: fileName, extend: extension, directory: fileDirectory };
}
