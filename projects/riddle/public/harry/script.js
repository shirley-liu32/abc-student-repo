let audio = document.createElement("AUDIO")
document.body.appendChild(audio);
audio.src = "falling.mp3";

document.body.addEventListener("mousemove", function () {
    audio.play()
})

let button = document.getElementById("button");
let harryInput = document.getElementById("harrySecret");

button.addEventListener("click", ()=>{
  console.log("click");
  let harrySecret = harryInput.value;
  console.log("secret:", harrySecret);
  window.location.href = "/harrySecret?word=" + harrySecret;
})

