import * as path from "path";
import * as fs from "fs";
import { proutedefonctions } from "../interfaces/functionsInterface";
//load les fonctions leurs descriptions etc
let functionsData: proutedefonctions[];
export function loadFunctionsData(): proutedefonctions[] {
  let functionsData = require("../../functions.json");
  return functionsData;
}
