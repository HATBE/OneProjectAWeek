import ConsoleOutputStorage from "../ConsoleOutputStorage";
import Command from "./Command";

export default class JokeCommand extends Command {
  protected name = "joke";
  protected description = "Prints a random joke";
  protected usage = "joke";

  protected async handle(args: string[]) {
    const joke = await this.getJoke();
    ConsoleOutputStorage.getInstance().addLine(joke);
  }

  private async getJoke(): Promise<string> {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      console.log(response);

      return ((await response.json()) as { joke: string }).joke;
    } catch (error) {
      console.error(error);
      return "UNKNOWN ERROR!";
    }
  }
}
