import { brackets } from "./Brack";
export class Pile {
  value: brackets | null;
  son: Pile | null;

  constructor(value: brackets | null = null, son: Pile | null = null) {
    this.value = value;
    this.son = son;
  }
  add(value: brackets): Pile {
    return new Pile(value, this);
  }
  getLast(): brackets | null {
    return this.value;
  }
  remove(): Pile {
    return this.son ? this.son : new Pile();
  }
  est_vide(): boolean {
    return this.son == null;
  }
  print(): void {
    let temp: Pile | null = this;
    console.log("|   |");
    while (temp && !temp.est_vide()) {
      console.log("| " + temp.value + " |");
      temp = temp.son;
    }
    console.log(" ---");
    console.log("\n\n");
  }
}
