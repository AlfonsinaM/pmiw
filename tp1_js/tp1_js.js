//Alfonsina Morales com3
//https://youtu.be/omdssNRMTUo?si=N9fX0K1gaIIeJIxF
let imagen;
let diamondSize = 50; //tamaño de los diamantes
let colorA = 0 ;// color negro
let colorB = 255; // color blanco
let tileSize = 100;//tamaño de cada cuadrado de ajedrez

function preload(){
  imagen=loadImage("/data/programacion.jpeg");//carga la imagen
}

function setup() {
createCanvas(800,400);
background(255);//color fondo
frameRate(2);//velocidad de la animacion

}


function draw() {
background(255);//patron de ajedrez como fondo
for (let y = 0; y < height; y += tileSize){
  for (let x = 0; x < width; x +=tileSize){
    if((x / tileSize + y / tileSize) % 2 === 0 ){
      fill(colorA);//color negro
    }else{
      fill(colorB);//color blanco
    }
    rect(x, y, tileSize, tileSize);
  }
}
//los diamantes arriba del patron de ajedrez
for(let y = 0; y < height; y += diamondSize * 2) {
  for (let x = 0; x < width; x += diamondSize *2){
    let posX = x + diamondSize;
    let posY = y + diamondSize;
    drawDiamond(posX, posY, diamondSize, colorA);
  }
}
//intercambian los colores para el efecto de animacion
let tempColor = colorA;
colorA = colorB;
colorB = tempColor;

 image(imagen,0,0,400,400); //imagen obra
}

//animacion de los diamantes de arriba 
function drawDiamond (x, y, size, fillColor){
  fill(fillColor);//color de relleno
  noStroke(); //elimina el contorno de alrededor
  beginShape();
  vertex(x - size / 2, y);
  vertex(x, y - size / 2);
  vertex(x + size / 2, y);
  vertex(x, y + size / 2);
  endShape(CLOSE);
}

//funcion que calcula el tamaño de los diamantes y devulve el valor
function calcularTileSize(ancho,alto) {
  let tamaño = ancho + alto;
  return tamaño;
  
}
 
