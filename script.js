let currentScreen = 1
let bookInitialized = false

/* SCREEN CHANGE */

function nextScreen(n){

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

let target = document.getElementById("screen"+n)

if(target){
target.classList.add("active")
}

currentScreen = n

updateProgress(n)

if(navigator.vibrate){
navigator.vibrate(40)
}

if(n === 4){
setTimeout(initBook,300)
}

}

/* PROGRESS BAR */

function updateProgress(screen){

let total = 8
let percent = (screen/total)*100

let bar = document.getElementById("progressBar")

if(bar){
bar.style.width = percent+"%"
}

}

/* TYPEWRITER */

function typeWriter(element,text,speed=50){

if(!element) return

let i = 0

function typing(){

if(i < text.length){

element.innerHTML = text.substring(0,i+1) + '<span class="cursor"></span>'
i++
setTimeout(typing,speed)

}else{

element.innerHTML = text

}

}

typing()

}

/* QUIZ */

function sendAnswer(){
nextScreen(3)
}

/* SONG */

function playSong(){

let song = document.getElementById("song")

if(song){
song.play()
}

}

/* PAGE FLIP SOUND */

function playFlip(){

let sound = document.getElementById("pageFlipSound")

if(sound){
sound.currentTime = 0
sound.play()
}

}

/* ARROW CONTROLS */

function flipNext(){
$("#book").turn("next")
}

function flipPrev(){
$("#book").turn("previous")
}

/* FINAL CHOICE */

function finalChoice(choice){

burstHearts()

setTimeout(()=>{

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById("finalScreen").classList.add("active")

let msg = choice==="love"
? "You just made my day ❤️"
: "I'm still glad you read everything 🙂"

typeWriter(
document.getElementById("finalMessage"),
msg,
70
)

},900)

}

/* HEART BURST */

let canvas
let ctx
let hearts=[]

function burstHearts(){

for(let i=0;i<40;i++){

hearts.push({

x:window.innerWidth/2,
y:window.innerHeight/2,
size:Math.random()*8+4,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6

})

}

animateHearts()

}

function animateHearts(){

ctx.clearRect(0,0,canvas.width,canvas.height)

hearts.forEach(h=>{

h.x += h.vx
h.y += h.vy

ctx.fillStyle="pink"

ctx.beginPath()
ctx.arc(h.x,h.y,h.size,0,Math.PI*2)
ctx.fill()

})

requestAnimationFrame(animateHearts)

}

/* DIARY BOOK */

function initBook(){

if(bookInitialized) return

if($("#book").length){

let width = window.innerWidth * 0.92
let height = window.innerHeight * 0.75

$("#book").turn({
width:width,
height:height,
autoCenter:true,
display:"single"
})

/* PAGE TURN EVENT */

$("#book").bind("turned",function(e,page){

playFlip()

let totalPages = $("#book").turn("pages")

if(page === totalPages){

let btn = document.getElementById("continueBtn")

if(btn){
btn.style.display="block"
}

}

})

bookInitialized = true

}

}

/* STARS BACKGROUND */

let starCanvas
let starCtx
let stars=[]

function drawStars(){

starCtx.clearRect(0,0,starCanvas.width,starCanvas.height)

starCtx.fillStyle="white"

stars.forEach(s=>{
starCtx.fillRect(s.x,s.y,s.size,s.size)
})

requestAnimationFrame(drawStars)

}

/* PAGE LOAD */

window.onload=function(){

typeWriter(
document.getElementById("intro"),
"I made something small today... and I wanted you to see it."
)

typeWriter(
document.getElementById("story"),
"There is something I wanted to say for a long time..."
)

typeWriter(
document.getElementById("songText"),
"Sometimes music can say things better than words."
)

typeWriter(
document.getElementById("confession"),
"I really like you."
)

typeWriter(
document.getElementById("friends"),
"If you don't feel the same way we can still be friends."
)

/* hearts canvas */

canvas = document.getElementById("heartsCanvas")

if(canvas){
ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}

/* stars canvas */

starCanvas = document.getElementById("stars")

if(starCanvas){

starCtx = starCanvas.getContext("2d")

starCanvas.width = window.innerWidth
starCanvas.height = window.innerHeight

for(let i=0;i<120;i++){

stars.push({
x:Math.random()*starCanvas.width,
y:Math.random()*starCanvas.height,
size:Math.random()*2
})

}

drawStars()

}

}
