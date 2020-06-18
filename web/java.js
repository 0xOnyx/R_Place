let game = document.getElementById("game")
let context = game.getContext("2d")

let socket = io.connect("192.168.1.204:333")




socket.on("board",(canvas)=>{
  for(let y = 0 ; y < canvas.length ; y++){
    for(let x = 0 ; x < canvas[y].length ; x++){
      context.fillStyle = canvas[y][x]
      console.log( y +" "+ x + "=")
      context.fillRect(( (x+1) *50)-50, ( (y+1) *50)-50, 50, 50)
    }
  }


/*
  canvas.forEach((y, idY)=>{
    y.forEach((color, idX)=>{
      context.fillStyle = color
      //idX = ( (idX+1) *50)-50
      //idY = ( (idY+1) *50)-50
      console.log( idY +" "+ idX + "=" + color)
      //console.log( (((idX+1) *50)-50) +" "+ (((idY+1) *50)-50) + "=" + color)
      context.fillRect(( (idX+1) *50)-50, ( (idY+1) *50)-50, 50, 50)
    })
  })*/
})

let colorActive = "white"
let color = ["#2ecc71","#3498db","#9b59b6","#f1c40f","#d35400","#e74c3c","white","#2c3e50"]
let choise = document.getElementsByClassName('choise')

for(let i = 0 ; i < choise.length ; ++i){
  choise[i].style.backgroundColor = color[i]
  choise[i].addEventListener("click",()=>{
    colorActive = color[i]
    choise[i].style.zIndex  = "100"
    choise[i].style.border  = "none"
    choise[i].style.transform = "scale(1.1)"
    choise[i].style.boxShadow = "5px 5px 20px #34495e"
    for(let y = 0 ; y < choise.length ; ++y){
      if(i != y){
        choise[y].style.zIndex  = "99"
        choise[y].style.transform = "scale(1)"
        choise[y].style.boxShadow = "none"
        choise[y].style.border  = "white 1px solid"
      }
    }
  })
}

socket.on("new", (carre)=>{
  context.fillStyle = carre.color
  context.fillRect(( (carre.x +1) *50)-50, ( (carre.y+1) *50)-50, 50, 50)
})

game.addEventListener("click",(e)=>{


  console.log(Math.floor(e.offsetX/50) + " " + Math.floor(e.offsetY/50))
  let carre = {
    x : Math.floor(e.offsetX/50),
    y : Math.floor(e.offsetY/50),
    color: colorActive
  }

  socket.emit("color", carre)
})
