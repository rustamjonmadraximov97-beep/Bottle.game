const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const rooms = {};

io.on("connection", (socket) => {

    console.log("Yangi o'yinchi:", socket.id);

    socket.on("joinRoom", ({ room, name }) => {

        socket.join(room);

        if (!rooms[room]) rooms[room] = [];

        rooms[room].push({
            id: socket.id,
            name: name
        });

        io.to(room).emit("players", rooms[room]);

    });

    socket.on("spin", (room) => {

        if (!rooms[room]) return;

        if (rooms[room].length < 2) return;

        const winner =
            rooms[room][
                Math.floor(Math.random() * rooms[room].length)
            ];

        io.to(room).emit("winner", winner);

    });

    socket.on("disconnect", () => {

        for (const room in rooms) {

            rooms[room] =
                rooms[room].filter(p => p.id !== socket.id);

            io.to(room).emit("players", rooms[room]);

        }

    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});
