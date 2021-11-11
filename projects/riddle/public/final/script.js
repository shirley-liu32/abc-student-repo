let audio = document.createElement("AUDIO")
document.body.appendChild(audio);
audio.src = "artic.mp3";

document.body.addEventListener("mousemove", function () {
    //audio.play()
})

let button = document.getElementById("button");
let articInput = document.getElementById("articSecret");

button.addEventListener("click", ()=>{
  console.log("click");
  let articSecret = articInput.value;
  console.log("secret:", articSecret);
  window.location.href = "/articSecret?word=" + articSecret;
})

