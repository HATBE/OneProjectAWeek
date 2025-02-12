package ch.hatbe2113;

public class App {
    private Server server;

    public App() {
        this.server = new Server(8080);
        this.server.start();
        this.server.listen();
        this.server.stop();
    }

}
