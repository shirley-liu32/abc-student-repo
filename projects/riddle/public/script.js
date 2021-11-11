let audio = document.createElement("AUDIO")
document.body.appendChild(audio);
audio.src = "sun.mp3";

document.body.addEventListener("mousemove", function () {
    audio.play()
})

let button = document.getElementById("button");
let secretInput = document.getElementById("secret");

button.addEventListener("click", ()=>{
  console.log("click");
  let secret = secretInput.value;
  console.log("secret:", secret);
  window.location.href = "/secret?word=" + secret;
})

