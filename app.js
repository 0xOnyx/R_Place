
const express = require("express")
const http = require("http")
const fs  = require("fs")
let socketIO = require("socket.io")

let app = express()

let server = http.createServer(app)
let io = socketIO.listen(server)

/*
let canvas = []

for(let y = 0 ; y < 40 ; ++y){
  canvas[y] = []
  for(let x = 0 ; x < 60 ; ++x){
    canvas[y][x] = "white"
  }
}
fs.writeFile("Dessin.txt", JSON.stringify(canvas), (err)=>{if(err){console.eror(err)}})
*/

let canvas = JSON.parse( fs.readFileSync("Dessin.txt") )

app.get("/",(req, res)=>{
  res.sendFile(__dirname + '/web/index.html')
})

app.use("/folder",express.static("web"))

io.on("connection", (socket)=>{
  socket.emit("board", canvas)

  socket.on("color", (carre)=>{
    canvas[carre.y][carre.x] = carre.color
    io.emit("new", carre)
    fs.writeFile("Dessin.txt", JSON.stringify(canvas), (err)=>{if(err){console.eror(err)}})
  })
})


server.listen(333)
