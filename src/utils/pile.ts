class Pile {
  value: "(" | ")" | "{" | "}" | undefined;
  son: Pile | undefined;

  constructor(value: "(" | ")" | "{" | "}" | undefined, son: Pile | undefined) {
    this.value = value;
    this.son = son;
  }
  add(value: "(" | ")" | "{" | "}"): Pile {
    return new Pile(value, this);
  }
  getLast() {
    return this.value;
  }
  remove() {
    if (!this.son) {
      return new Pile(undefined, undefined);
    }
    return this.son;
  }
}
