const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

// Store messages in memory (replace with a database in a production environment)
let messages = [];

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected");

    // Send existing messages to the client
    socket.emit("messages", messages);

    // Handle incoming messages from clients
    socket.on("message", (message) => {
        // Store the message
        messages.push(message);

        // Broadcast the message to all connected clients
        io.emit("message", message);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
