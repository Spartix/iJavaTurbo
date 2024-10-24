//interface pour les fonctions stocké dans ./functions.json
export interface proutedefonctions {
  name: string;
  description: string;
  return: string;
  args: InterfaceArg[];
}
// Interface des arguments des fonctions
export interface InterfaceArg {
  name: string;
  type: string;
  required: boolean;
}
