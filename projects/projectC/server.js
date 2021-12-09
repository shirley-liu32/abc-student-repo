let http = require('http');
let express = require('express');
let socket_io = require('socket.io');

let server = http.Server(app);
let io = socket_io(server);


let app = express();
app.use(express.static('public'));

let totalUsers = 0;
let prevTotal;

let userType = true;
let drawerWord;
let usersArray = [];
let usersConnected;
let drawer = false;
let drCount = 0;

io.on('connection', function(socket) {

    socket.emit('setID', socket.id);


    prevTotal = totalUsers;

    totalUsers++;
    socket.broadcast.emit('playerJoined', totalUsers);

   
    //first person is drawer, determined by userType
    if (totalUsers > 1) {
        userType = false;
    } else {
        userType = true;
    }


    socket.emit('userTypeCheck', userType);

  
    //recieves usertype and randomword but only drawer's saved
    socket.on('clientToServerWordCheck', function(wordCheckObject) {
        if (wordCheckObject.drawer) {
            drawerWord = wordCheckObject.word;
        }
    });


    socket.on('clientToServer', function(clientObject) {
        socket.broadcast.emit('serverToClient', clientObject);
    });

    socket.on('guessToServer', function(message) {
        if (message.guess.toLowerCase() === drawerWord) {
            let guessToClientObject = { guess: message.guess, word: drawerWord };
            io.sockets.emit('guessToClient', guessToClientObject);
        } else {
            socket.broadcast.emit('guessToClient', message);
        }
    });

    socket.on('disconnect', function() {
        totalUsers = totalUsers - 1;
        usersArray = [io.sockets.clients()];
        usersConnected = Object.getOwnPropertyNames(usersArray[0].server.nsps['/'].sockets);
        //emit when user disconnects
        socket.broadcast.emit('playerLeft', totalUsers);
        socket.broadcast.emit('serverToClientDrawerCheck');

    });

    socket.on('drawer', function(clientToServerDrawerCheck) {
        drCount++;
        if (clientToServerDrawerCheck === true) {
            drawer = true;
        }

        if (drCount === totalUsers) {
            if (drawer === true) {
                drCount = 0;
            } else {
                drCount = 0;
                for (let i = 0; i < usersConnected.length; i++) {
                    if (i === usersConnected.length - 1) {
                        io.sockets.connected[usersConnected[i]].emit('addNewDrawer', true);
                    } else {
                        io.sockets.connected[usersConnected[i]].emit('resetGuessers');
                    }
                }
            }

            drawer = false;
        }
    });
});

server.listen(3000, function() {
  console.log('Please navigate to http://localhost:3000');
});