import SessionCommand from "./SessionCommand";

export default class TestSessionCommand implements SessionCommand {
    public run() {
        alert("SESSION")
    }
}