import { brackets, inverse } from "./Brack";
import { Pile } from "./pile";
export function isClose(list: brackets[]): boolean {
  let P: Pile = new Pile();
  let indice = new Pile();

  for (let i = 0; i < list.length; i++) {
    //console.log(`Pile ${i}`);
    //P.print();
    let last = P.getLast();
    let element = list[i];
    // Si le last c'est un start de chaine de cara
    if (last) {
      if (last == "'" || last == '"') {
        //seulment si c'est la fin de la chaine de cara
        if (element == last) {
          P = P.remove();
          indice = indice.remove();
        }
      } else {
        // si l'element que l'on verif est l'inverse du last alors on remove
        if (element == inverse(last)) {
          P = P.remove();
          indice = indice.remove();
        } else {
          // si c'est pas l'inverse on rajoute
          P = P.add(element);
          //indice = indice.add(i);
        }
      }
    } else {
      P = P.add(element);
      //indice = indice.add(i);
    }
  }
  //P.print();
  return P.est_vide();
}

export function GetRegex(chaine: string): brackets[] {
  return Array.from(
    chaine.matchAll(/(?<!\\)["']|[\(\)\[\]\{\}]/g),
    (match) => match[0] as brackets
  );
}
