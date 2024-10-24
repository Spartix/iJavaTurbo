export type brackets = "{" | "}" | "(" | ")" | "[" | "]" | '"' | "'";

interface inverser {
  [key: string]: brackets;
}

const InverseBrack: inverser = {
  "{": "}",
  "(": ")",
  "[": "]",
  '"': '"',
  "'": "'",
};

export function inverse(Brack: brackets): brackets {
  return InverseBrack[Brack];
}
