type Listener = (data: string[]) => void;

export default class ConsoleDataStorage {
  private static instance: ConsoleDataStorage | null = null;

  private lines: string[] = [];
  private listeners: Set<Listener> = new Set();

  public static getInstance(): ConsoleDataStorage {
    if (!ConsoleDataStorage.instance) {
      ConsoleDataStorage.instance = new ConsoleDataStorage();
    }
    return ConsoleDataStorage.instance;
  }

  public addLine(line: string): void {
    this.lines.push(line);
    this.notifyListeners();
  }

  public addEmptyLine(): void {
    this.addLine("\u00A0");
  }

  public addSeperator(): void {
    this.addLine("---------------");
  }

  public clear(): void {
    this.lines = [];
    this.notifyListeners();
  }

  public getLines(): string[] {
    return this.lines;
  }

  public subscribe(listener: Listener): void {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: Listener): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.lines));
  }
}
