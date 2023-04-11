// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.Server(app);
// const io = socketIO(server);

// app.use(express.static(__dirname + '/public'));

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('Message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

// server.listen(4000, () => {
//   console.log('Server started on port 4000');
// });



const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
