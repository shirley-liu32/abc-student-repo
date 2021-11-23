let socket = io();
let peer = new Peer();
let myPeerID;


socket.on("welcomeToAT&T", function(welcomePack){
    console.log("got a welcome pack from AT&T");
    console.log(welcomePack);

    //now we have our own phone number:
    myPeerID = welcomePack.yourPeerID;
    let peer = new Peer(myPeerID);
    
    peer.on('open', function(id) {
        //now ready to connect to peers
        console.log('My peer ID is: ' + id);
        console.log("who to call?");
        
        for(let i = 0; i < welcomePack.pleaseCall.length; i++){
            let callThisNumber = welcomePack.pleaseCall[i].peerID;
            if (callThisNumber != myPeerID){
            console.log("calling", callThisNumber);
            let conn = peer.connect(callThisNumber);
            }
        }
      
      });

      peer.on('connection', function(conn) { 
        console.log("i am being connected with on the network");
    });
});


