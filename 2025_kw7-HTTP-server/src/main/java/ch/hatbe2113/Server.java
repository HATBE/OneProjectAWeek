package ch.hatbe2113;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class Server {
    private int port;
    private ServerSocket serverSocket;


    public Server(int port) {
        this.port = port;
    }

    public boolean start() {
        try {
            this.serverSocket = new ServerSocket(this.port);
            System.out.println("Server started on port " + this.port);
            return true;
        } catch(IOException e) {
            System.err.println("Could not listen on port: " + this.port);
            e.printStackTrace();
            return false;
        }
    }

    public void listen() {
        while(true) {
            System.out.println("Listening...");
            try {
                Socket socket = this.serverSocket.accept();
                RequestThread requestThread = new RequestThread(socket);
                System.out.println("New client connected");
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void stop() {
        if(serverSocket == null) {
            return;
        }

        try {
            this.serverSocket.close();
            System.out.println("Server stopped.");
        } catch (IOException e) {
            System.err.println("Could not stop server!");
            e.printStackTrace();
        }
    }

    public ServerSocket getServerSocket() {
        return this.serverSocket;
    }
}
