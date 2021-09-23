//follows lab 3 animation 2

let pointSound = new Audio('assets/point.wav');
let doneSound = new Audio('assets/done.ogg');

//make some normal bees
for(let i = 0; i < 20; i++){  
  //give it a class & random position
  let bee = document.createElement("div");
  bee.className = "movingBees";
  let ranX = Math.random()*(window.innerWidth-50);
  let ranY = Math.random()*(window.innerHeight-50);
  //position the bees with the random numbers
  bee.style.transform = "translate("+ranX+"px, "+ranY+"px)";
  //append the bees to the body
  document.body.appendChild(bee)
}

let movingBees = document.getElementsByClassName("movingBees");

setInterval(()=>{
  //make a loop for the bees
  for(let i = 0; i < movingBees.length; i++){
    // pick a new random position
    let ranX = Math.random()*(window.innerWidth-45);
    let ranY = Math.random()*(window.innerHeight-45);
    movingBees[i].style.transform = "translate("+ranX+"px, "+ranY+"px)";
  }
}, 1000); //moves bees every second

//move bees right at the start
setTimeout(()=>{
  for(let i = 0; i<movingBees.length; i++){
    let ranX = Math.random()*(window.innerWidth-45);
    let ranY = Math.random()*(window.innerHeight-45);
    movingBees[i].style.transform = "translate("+ranX+"px, "+ranY+"px)";
  }
}, 0)

//make div for queen bee and give it a class
let queenBee = document.createElement("div");
queenBee.className = "queen";

//random position and append queen bee to body
let randomX = Math.random()*(window.innerWidth-50);
let randomY = Math.random()*(window.innerHeight-50);
queenBee.style.transform = "translate("+randomX+"px, "+randomY+"px)";
document.body.appendChild(queenBee);

setInterval(()=>{
      let randomX = Math.random()*(window.innerWidth-50);
      let randomY = Math.random()*(window.innerHeight-50);
      queenBee.style.transform = "translate("+randomX+"px, "+randomY+"px)";
  }, 1000); //moves queen every second
  
  //move at start
  setTimeout(()=>{
      let randomX = Math.random()*(window.innerWidth-50);
      let randomY = Math.random()*(window.innerHeight-50);
      queenBee.style.transform = "translate("+randomX+"px, "+randomY+"px)";
  
  }, 0)

  queenBee.addEventListener("click",checkHit);
  
  let counter = 0;

  //function to check if user clicks on bee 10 times
  function checkHit(){
    counter ++;
    document.getElementById("numHits").innerHTML = "HITS: " + counter;
    pointSound.play();
    //show the winnning screen
    if (counter == 10){
      document.getElementsByTagName('BODY')[0].innerHTML = '';
      var x = document.createElement("img");
      document.body.appendChild(x)
      x.src = "assets/yay.gif";
      doneSound.play();
    }
  }