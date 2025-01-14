type Listener = (data: string[]) => void;

export default class ConsoleOutputStorage {
  private static instance: ConsoleOutputStorage | null = null;

  private lines: string[] = [];
  private listeners: Set<Listener> = new Set();

  public static getInstance(): ConsoleOutputStorage {
    if (!ConsoleOutputStorage.instance) {
      ConsoleOutputStorage.instance = new ConsoleOutputStorage();
    }
    return ConsoleOutputStorage.instance;
  }

  public addLine(line: string): void {
    this.lines.push(line);
    this.notifyListeners();
  }

  public addLines(lines: string[]) {
    lines.forEach((line) => {
      this.lines.push(line);
    });
    this.notifyListeners();
  }

  public getEmptyLine(): string {
    return "\u00A0";
  }

  public getSeperator(): string {
    return "---------------";
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
