import CommandsHandler from "./commands/CommandsHandler";
import ConsoleOutputManager from "./ConsoleOutputManager";

export default class Console {
    private consoleOutputManager: ConsoleOutputManager;
    private commandsHandler: CommandsHandler;
    
    public constructor() {
        this.consoleOutputManager = new ConsoleOutputManager();
        this.commandsHandler = new CommandsHandler(this);

    }

    public getCommandsHandler() {
        return this.commandsHandler;
    }

    public handleInput(text: string) {
        this.commandsHandler.handleCommand(text)
    }

    public getConsoleOutputManager() {
        return this.consoleOutputManager;
    }
}