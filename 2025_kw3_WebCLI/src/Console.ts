import CommandsHandler from "./commands/CommandsHandler";
import SessionCommand from "./commands/SessionCommand";
import ConsoleOutputManager from "./ConsoleOutputManager";

export default class Console {
    private consoleOutputManager: ConsoleOutputManager;
    private commandsHandler: CommandsHandler;
    private currentSession: SessionCommand | null = null;
    
    public constructor(consoleOutputManager: ConsoleOutputManager, commandsHandler: CommandsHandler) {
        this.commandsHandler = commandsHandler;
        this.consoleOutputManager = consoleOutputManager;
    }

    public getCommandsHandler() {
        return this.commandsHandler;
    }

    public handleInput(text: string) {
        if(this.currentSession) {
            this
            return;
        }
        this.commandsHandler.handleCommand(text)
    }

    public getCurrentSession() {
        return this.currentSession;
    }

    public getConsoleOutputManager() {
        return this.consoleOutputManager;
    }
}