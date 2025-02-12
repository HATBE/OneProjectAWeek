package ch.hatbe2113;

import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class RequestThread implements Runnable {
    private Thread thread;
    private Socket conn;
    private BufferedReader fromClientReader;
    private PrintWriter toClientWriter;

    public RequestThread(Socket conn) {
        this.conn = conn;
        this.thread = new Thread(this);
        this.thread.start();
    }

    @Override
    public void run() {
        try {
            fromClientReader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
            toClientWriter = new PrintWriter(new OutputStreamWriter(conn.getOutputStream(), StandardCharsets.UTF_8), true);

            // read HTTP request
            String requestLine = fromClientReader.readLine();
            if (requestLine == null || requestLine.isEmpty()) {
                disconnect();
                return;
            }

            System.out.println("Received request: " + requestLine);

            // read headers
            String line;
            while ((line = fromClientReader.readLine()) != null && !line.isEmpty()) {
                System.out.println("Header: " + line);
            }

            // send response
            String responseBody = "<html><body><h1>Hello, World!</h1></body></html>";
            int contentLength = responseBody.getBytes(StandardCharsets.UTF_8).length;

            toClientWriter.println("HTTP/1.1 404 fuck you");
            toClientWriter.println("Content-Type: text/html; charset=UTF-8");
            toClientWriter.println("Content-Length: " + contentLength);
            toClientWriter.println("Connection: close");
            toClientWriter.println();                   // end of headers
            toClientWriter.println(responseBody);       // response body

            // ensure everything is sent before closing
            toClientWriter.flush();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            disconnect();
        }
    }

    private void disconnect() {
        try {
            if (fromClientReader != null) fromClientReader.close();
            if (toClientWriter != null) toClientWriter.close();
            if (conn != null) conn.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
