export function isClose(list: Array<"(" | ")" | "{" | "}">) {
  let P = new Pile(undefined, undefined);
  list.forEach((element) => {
    if (element == "(" || element == "{") {
      P = P.add(element);
    } else {
      if (P.getLast() == "(" && element == "}") {
      } else {
        P = P.remove();
      }
    }
  });
}
