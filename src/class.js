export class Item {
  #name;
  #weakness;
  constructor(name, weakness) {
    this.#name = name;
    this.#weakness = weakness;
  }
  get name() {
    return this.#name.toLowerCase().trim();
  }
  get weakness() {
    return this.#weakness.toLowerCase().trim();
  }
}
