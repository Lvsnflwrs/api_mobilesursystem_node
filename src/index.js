require("dotenv").config();

const http = require("http"); 
const { WebSocketServer } = require("ws");
const { webSocketHandler } = require("./controller/webSocketController");

const PORT = process.env.PORT || 3000;

const server = http.createServer();

const wss = new WebSocketServer({ server: server });

wss.on("connection", webSocketHandler);

wss.on("close", () => {
    console.log("Client disconnected");
});

wss.on("error", (error) => {
    console.error("WebSocket error:", error);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Secure WebSocket Server running at wss://0.0.0.0:${PORT}`);
});