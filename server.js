const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Spin the Bottle Server ishlamoqda! 🚀');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Yangi o\'yinchi ulandi:', socket.id);

    socket.on('joinTable', (data) => {
        socket.join(data.tableId);
    });

    socket.on('spinBottle', (data) => {
        io.to(data.tableId).emit('bottleSpun', data);
    });

    socket.on('disconnect', () => {
        console.log('O\'yinchi chiqdi:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server ${PORT}-portda yondi`);
});
