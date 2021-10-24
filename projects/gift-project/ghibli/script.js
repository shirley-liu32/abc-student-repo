//audio files and isPlaying variables to check which audio is playing
let totoroSound = new Audio('totoro.mp3');
let ponyoSound = new Audio('ponyo.mp3');
let kikiSound = new Audio('kiki.mp3');
let spiritedSound = new Audio('spirited.mp3');
let volume = document.querySelector("#volumeControl");
let isPlaying1 = false;
let isPlaying2 = false;
let isPlaying3 = false;
let isPlaying4 = false;

//toggle play and pause for each audio
function togglePlay1() {
    if (isPlaying1){
        totoroSound.pause();
        ponyoSound.pause();
        kikiSound.pause();
        spiritedSound.pause();
    } 
    else{
        totoroSound.play();
        ponyoSound.pause();
        kikiSound.pause();
        spiritedSound.pause();
    } 
  };
  
  totoroSound.onplaying = function() {
    isPlaying1 = true;
  };
  totoroSound.onpause = function() {
    isPlaying1 = false;
  };


function togglePlay2() {
    if (isPlaying2){
        totoroSound.pause();
        ponyoSound.pause();
        kikiSound.pause();
        spiritedSound.pause();
    } 
    else{
        totoroSound.pause();
        ponyoSound.play();
        kikiSound.pause();
        spiritedSound.pause();
    } 
};

ponyoSound.onplaying = function() {
    isPlaying2 = true;
};
ponyoSound.onpause = function() {
    isPlaying2 = false;
};

function togglePlay3() {
    if (isPlaying3){
        totoroSound.pause();
        ponyoSound.pause();
        kikiSound.pause();
        spiritedSound.pause();
    } 
    else{
        kikiSound.play();
        spiritedSound.pause();
        totoroSound.pause();
        ponyoSound.pause();
    } 
};

kikiSound.onplaying = function() {
    isPlaying3 = true;
};
kikiSound.onpause = function() {
    isPlaying3 = false;
};

function togglePlay4() {
    if (isPlaying4){
        totoroSound.pause();
        ponyoSound.pause();
        kikiSound.pause();
        spiritedSound.pause();
    } 
    else{
        spiritedSound.play();
        totoroSound.pause();
        ponyoSound.pause();
        kikiSound.pause();
    } 
};

spiritedSound.onplaying = function() {
    isPlaying3 = true;
};
spiritedSound.onpause = function() {
    isPlaying3 = false;
};

//when clicking on an icon, run the togglePlay functions
document.getElementById("totoro").addEventListener("click", togglePlay1);
document.getElementById("ponyo").addEventListener("click", togglePlay2);
document.getElementById("kiki").addEventListener("click", togglePlay3);
document.getElementById("spirited").addEventListener("click", togglePlay4);

//changing the volume for the audio
volume.addEventListener("change", function(e) {
    totoroSound.volume = e.currentTarget.value / 100;
    ponyoSound.volume = e.currentTarget.value / 100;
    kikiSound.volume = e.currentTarget.value / 100;
    spiritedSound.volume = e.currentTarget.value / 100;

})