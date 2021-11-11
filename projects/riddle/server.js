const express = require('express')
const app = express()
const port = 3010 
const secret = "it's all right";
const harrySecret = "we've run out of things we can say";
const articSecret = "if you wanted to";
//const port = process.env.PORT //port for glitch

let gifts = [];

app.use(express.static('public'))


app.get('/secret', (request, response) => {
  // console.log(request);
  let query = request.query;
  let guess = query.word;
  console.log(query);
  if(guess.toLowerCase() == secret){
    console.log("let them guess the song lyrics");
    response.redirect("/harry");
    // response.sendFile(__dirname + '/public/harry/index.html')
  }else{
    console.log("something is fishy");
    // response.sendFile(__dirname + '/public/fishy/index.html')
    response.redirect("/fishy");
  }
  console.log("--------")
  // res.sendFile(__dirname + '/index.html')
})



app.get('/harrySecret', (request, response) => {
  // console.log(request);
  let query = request.query;
  let guess = query.word;
  console.log(query);
  if(guess.toLowerCase() == harrySecret){
    console.log("let them guess the song lyrics");
    response.redirect("/final");
    // response.sendFile(__dirname + '/public/harry/index.html')
  }else{
    console.log("something is fishy");
    // response.sendFile(__dirname + '/public/fishy/index.html')
    response.redirect("/fishy");
  }
  console.log("--------")
  // res.sendFile(__dirname + '/index.html')
})

app.get('/articSecret', (request, response) => {
  // console.log(request);
  let query = request.query;
  let guess = query.word;
  console.log(query);
  if(guess.toLowerCase() == articSecret){
    console.log("let them guess the song lyrics");
    response.redirect("/finalFolder");
    // response.sendFile(__dirname + '/public/harry/index.html')
  }else{
    console.log("something is fishy");
    // response.sendFile(__dirname + '/public/fishy/index.html')
    response.redirect("/fishy");
  }
  console.log("--------")
  // res.sendFile(__dirname + '/index.html')
})


app.get('/gift', (request, response) => {
  // console.log(request);
  let query = request.query;
  let gift = query.gift;
  gifts.push(gift)
  console.log("received:", gift);
  console.log("all the things I have:", gifts);
  console.log("--------")

})
app.get('/getGifts', (request, response) => {
  console.log("someone asks for gifts");
  response.json( {content: gifts, sender: "the garden gods"} );
  console.log("--------");


})

//
// app.get('/script.js', (req, res) => {
//   res.sendFile(__dirname + '/script.js')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})