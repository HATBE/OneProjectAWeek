export default class MemoryCard {
  private id: string;
  private imagePath: string;

  constructor(id: string, imagePath: string) {
    this.id = id;
    this.imagePath = imagePath;
  }

  public getId() {
    return this.id;
  }

  public getImagePath() {
    return this.imagePath;
  }
}
