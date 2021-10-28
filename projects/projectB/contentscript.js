let spell;


//asks user for permission to use microphone
navigator.webkitGetUserMedia({
    audio: true,
}, function() {
    //using the webkit speech recognition api
    //Example Credit: https://github.com/zolomohan/speech-recognition-in-javascript/blob/master/language.js
    
    //check if object is available
    if ("webkitSpeechRecognition" in window) {
        let speechRecognition = new webkitSpeechRecognition();
        let final_transcript = "";
        
        //continuous listening
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = document.querySelector("#select_dialect").value;
      
        speechRecognition.onstart = () => {
          document.querySelector("#status").style.display = "block";
        };
        speechRecognition.onerror = () => {
          document.querySelector("#status").style.display = "none";
          console.log("Speech Recognition Error");
        };
        speechRecognition.onend = () => {
          document.querySelector("#status").style.display = "none";
          spell = final_transcript;
          console.log("Speech Recognition Ended");

          //animate the page depending on the commands
            if (final_transcript == "rotate"){
                console.log("the command is rotate");
                spinElements();
            }
            if (final_transcript == "bounce"){
                console.log("the command is bounce");
                bounceElements();
            }
            if (final_transcript == "make the background red"){
                bgColorRed();
            }
            if (final_transcript == "make the background blue"){
              bgColorBlue();
          }
      
          if (final_transcript == "make the background green"){
            bgColorGreen();
        }
        if (final_transcript == "change the font color"){
          changeFont();
       }
    
        
        
        };
      
        speechRecognition.onresult = (event) => {
          let interim_transcript = "";
      
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          document.querySelector("#final").innerHTML = final_transcript;
          document.querySelector("#interim").innerHTML = interim_transcript;
        };
      
        document.querySelector("#start").onclick = () => {
          speechRecognition.start();
        };
        document.querySelector("#stop").onclick = () => {
          speechRecognition.stop();
        };
      } else {
        console.log("Speech Recognition Not Available");
      }
}, function() {
    //No permission (or no microphone available).
    console.log("access not granted for microphone.");
});

function spinElements(){
    let divs = document.getElementsByTagName("div");
    for(let i = 0; i < divs.length; i++){
        divs[i].style.transform = 'rotate(90deg)';
    }
    console.log("element is spinning")
}

function bgColorRed(){
    let divs = document.getElementsByTagName("div");
    for(let i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "red";
    }
    console.log("element is red");
}

function bgColorBlue(){
  let divs = document.getElementsByTagName("div");
  for(let i = 0; i < divs.length; i++){
      divs[i].style.backgroundColor = "blue";
  }
  console.log("element is red");
}
function bgColorGreen(){
  let divs = document.getElementsByTagName("div");
  for(let i = 0; i < divs.length; i++){
      divs[i].style.backgroundColor = "green";
  }
}
function bounceElements(){
    let paras = document.getElementsByTagName("p");
    for(let i = 0; i < paras.length; i++){
        paras[i].className += "bounce";
    }
    console.log("element is bouncing")
}
function changeFont(){
  let paras = document.getElementsByTagName("h2");
  for(let i = 0; i < paras.length; i++){
    paras[i].style.color = "purple";
  }
}