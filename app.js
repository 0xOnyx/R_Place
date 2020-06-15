
const express = require("express")
const http = require("http")
const fs  = require("fs")
let socketIO = require("socket.io")

let app = express()

let server = http.createServer(app)
let io = socketIO.listen(server)

/*
let canvas = []

for(let y = 0 ; y < 20 ; ++y){
  canvas[y] = []
  for(let x = 0 ; x < 40 ; ++x){
    canvas[y][x] = "white"
  }
}
*/

let canvas = JSON.parse( fs.readFileSync("test.txt") )

app.get("/",(req, res)=>{
  res.sendFile(__dirname + '/web/index.html')
})

app.use("/folder",express.static("web"))

io.on("connection", (socket)=>{
  socket.emit("board", canvas)

  socket.on("color", (carre)=>{
    canvas[carre.y][carre.x] = carre.color
    io.emit("board", canvas)
    fs.writeFile("test.txt", JSON.stringify(canvas), (err)=>{if(err){console.eror(err)}})
  })
})


server.listen(80)
