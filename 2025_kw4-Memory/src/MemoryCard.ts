export default class MemoryCard {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }
}
