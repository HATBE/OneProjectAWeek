type Listener = (data: string[]) => void;

export default class ConsoleOutputManager {
  private lines: string[] = [];
  private listeners: Set<Listener> = new Set();

  public addLine(line: string): void {
    this.lines.push(line.replace(/ /g, "\u00A0"));
    this.notifyListeners();
  }

  public addLines(lines: string[]) {
    lines.forEach((line) => {
      this.lines.push(line.replace(/ /g, "\u00A0"));
    });
    this.notifyListeners();
  }

  public getEmptyLine(): string {
    return "\u00A0";
  }

  public getSeperator(): string {
    return "---------------";
  }

  public printBanner(): void {
    const lines: string[] = [];

    lines.push(this.getEmptyLine());
    lines.push(" __    __     _       ___   __   _____ ");
    lines.push("/ / /\\ \\ \\___| |__   / __\\ / /   \\_   \\");
    lines.push("\\ \\/  \\/ / _ \\ '_ \\ / /   / /     / /\\/");
    lines.push(" \\  /\\  /  __/ |_) / /___/ /___/\\/ /_  ");
    lines.push("  \\/  \\/ \\___|_.__/\\____/\\____/\\____/  ");
    lines.push(this.getEmptyLine());
    lines.push("Welcome!");
    lines.push(this.getEmptyLine());

    this.addLines(lines);
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
