//when everything is loaded then run the game function
document.addEventListener("DOMContentLoaded", function(event) {

    drawingGame();

});


let drawingGame = function() {
    let canvas
    
    let context;
    let socket = io();

    let guessBox;
    let userType;
    let initialGuess;
    let randomWord;

    socket.on('setID', function(userID) {
        ID = userID;
    });

    socket.on('playerJoined', function(totalUsers) {
        $('.totalPlayers').text(totalUsers);
        $('.playerJoined').fadeIn(1000, 'linear').delay(1000).fadeOut(1000, 'linear');
    });

    socket.on('playerLeft', function(totalUsers) {
        $('.totalPlayers').text(totalUsers);
        $('.playerLeft').fadeIn(1000, 'linear').delay(1000).fadeOut(1000, 'linear');

    });

    // list of objects from https://github.com/dariusk/corpora/blob/master/data/objects/objects.json
    let wordList = [
    "ornament",
    "acorn",
    "apple",
    "bag",
    "balloon",
    "banana",
    "bandana",
    "baseball",
    "basketball",
    "bed",
    "beef",
    "bell",
    "belt",
    "book",
    "bottle",
    "bow",
    "bracelet",
    "bread",
    "broccoli",
    "brush",
    "buckle",
    "button",
    "camera",
    "candle",
    "candlestick",
    "car",
    "card",
    "carrot",
    "cat",
    "chair",
    "chalk",
    "chicken",
    "chocolate",
    "clock",
    "clothes",
    "cork",
    "couch",
    "cow",
    "cucumber",
    "cup",
    "dagger",
    "deodorant",
    "desk",
    "dictionary",
    "dog",
    "dolphin",
    "door",
    "dove",
    "drawer",
    "egg",
    "fish",
    "food",
    "football",
    "fork",
    "fridge",
    "giraffe",
    "glass",
    "glasses",
    "hamster",
    "hanger",
    "harmonica",
    "helmet",
    "house",
    "key",
    "key chain",
    "keyboard",
    "keychain",
    "keys",
    "knife",
    "lace",
    "ladle",
    "lamp",
    "lion",
    "locket",
    "lotion",
    "magazine",
    "map",
    "marble",
    "matchbook",
    "microphone",
    "milk",
    "mirror",
    "nail",
    "notebook",
    "notepad",
    "novel",
    "orange",
    "panda",
    "pants",
    "paper",
    "paperclip",
    "pen",
    "pencil",
    "quilt",
    "rabbit",
    "radio",
    "rat",
    "remote",
    "sandal",
    "shampoo",
    "shark",
    "sharpie",
    "socks",
    "sofa",
    "tiger",
    "towel",
    "tree",
    "umbrella",
    "wallet",
    "watch",
    "water",
    "window",
    "zebra",
    ];


    //clears the guessing and only shows the user they are drawer and what the word is
    let drawerReset = function() {
        randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        $('.userGuesses').empty();
        $('#top-message .drawerTag').css('display', 'inline-block');
        $('.drawerTag span').text(randomWord);
        $('#top-message #guess').css('display', 'none');
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);

    };

    //displays the box for people to guess
    let guesserReset = function() {
        $('.userGuesses').empty();
        $('#top-message #guess').css('display', 'inline-block');
        $('#top-message .drawerTag').css('display', 'none');
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);
    };

    //makes the first user the drawer and sets that type as true, everybody else is a guesser so their type is false
    socket.on('userTypeCheck', function(type) {

        userType = type;
        if (userType === true) {
            drawerReset();
        } else if (userType === false) {
            guesserReset();
        }

        //sends the type of user and the random word
        socket.emit('clientToServerWordCheck', { drawer: userType, word: randomWord });

    });

    //will emit the user type back to server
    socket.on('serverToClientDrawerCheck', function() {

        socket.emit('drawerHere', userType);
    });

    //restart the game and add new drawer if previous person leaves
    socket.on('addNewDrawer', function(addDrawer) {
        userType = addDrawer;
        drawerReset();
        socket.emit('clientToServerWordCheck', { drawer: userType, word: randomWord });

    });

    socket.on('resetGuessers', function() {
        guesserReset();

    });


    //guesser can click enter and guessToServer emits user's guess
    let onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }

        if (userType === false) {
            initialGuess = guessBox.val();

            socket.emit('guessToServer', { guess: guessBox.val() });

            guessBox.val('');
        }

    };

    socket.on('guessToClient', function(information) {


        if (information.guess === initialGuess) {
            userType = true;
            drawerReset();
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);
            socket.emit('clientToServerWordCheck', { drawer: userType, word: randomWord });

           
        } else if (userType === true && $('span').text() === information.word) {
            userType = false;
            guesserReset();
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);
        }

      
        else if (userType === false && information.guess === information.word) {
            guesserReset();
            context.clearRect(0, 0, canvas[0].width, canvas[0].height);
        }
        
        else {
            let guessesSection = $('.userGuesses');
            guessesSection.text(information.guess);
        }
    });

    guessBox = $('input');
    guessBox.on('keydown', onKeyDown);

    //handle the drawing 
    let draw = function(position) {
        context.beginPath();

        context.arc(position.x, position.y,
            6, 0, 2 * Math.PI);
        context.fill();
    };


    let drawing = false;
    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;

    canvas.on('mousedown', function() {
        drawing = true;
    });

    canvas.on('mouseup', function() {
        drawing = false;
    });

    canvas.on('mousemove', function(event) {
        if (userType) {
            if (drawing) {
                let offset = canvas.offset();
                let position = {
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                };
                draw(position);
                socket.emit('clientToServer', position);
            }
        }

    });

    //use draw when emitted
    socket.on('serverToClient', draw);

};

