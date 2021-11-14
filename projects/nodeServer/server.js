const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"));

function testingAsk(req,res){
    res.sendFile(__dirname + "/index.html");
}

app.get('/', testingAsk);

app.get('/shilrey', (req, res) => {
    res.send('testing route!')
  })

// app.get('/garden', (req, res) => {
//     res.sendFile(__dirname + "/garden/index.html");
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})