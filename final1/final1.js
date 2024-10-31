//Morales Alfonsina COM 3 
//
let estado;
let textos = [];
let imag = [];
let boton = [];
let boton2 = [];

let inicio;
let p2;
let p3;
let p4;
let p5;
let p6;
let p7;
let p2b;
let p2c;
let p2d;
let p5b;
let p5c;

let musica;
//variables de arreglo

function setup() {
  createCanvas(640, 480);
  inicializar();
  
  //  las imágenes 
  inicio = loadImage('data/inicio.jpeg');
  p2 = loadImage('data/p2.jpeg');
  p3 = loadImage('data/p3.jpeg');
  p4 = loadImage('data/p4.jpeg');
  p5 = loadImage('data/p5.jpeg');
  p6 = loadImage('data/p6.jpeg');
  p7 = loadImage('data/p7.jpeg');
  p2b = loadImage('data/p2b.jpeg');
  p2c = loadImage('data/p2c.jpeg');
  p2d = loadImage('data/p2d.jpeg');
  p5b = loadImage('data/p5b.jpeg');
  p5c = loadImage('data/p5c.jpeg');
  
  musica = document.getElementById("sonido-cancion");
}

function draw() {
  musica.play();
  // Gestión de los diferentes estados de cada pantalla 
  if (estado === 0) {
    pantallaInicio(inicio);
  } else if (estado === 1) {
    pantallaBotones(0, p2);
  } else if (estado === 2) {
    pantallaSiguiente(1, p3);
  } else if (estado === 3) {
    pantallaSiguiente(2, p4);
  } else if (estado === 4) {
    pantallaBotones(3, p5);
  } else if (estado === 5) {
    pantallaSiguiente(4, p6);
  } else if (estado === 6) {
    pantallaReiniciar(10,p7);
  } else if (estado === 7) {
    pantallaBotones(5, p2b);
  } else if (estado === 8) {
    pantallaCreditos(6, p2c);
  } else if (estado === 9) {
    pantallaCreditos(7, p2d);
  } else if (estado === 10) {
    pantallaSiguiente(8, p5b);
  } else if (estado === 11) {
    pantallaCreditos(9, p5c);
  }
}

function mousePressed() {
  // Detección de colisiones y cambios de estado
  if (estado === 0) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 1;
    }
  } else if (estado === 1) {
    if (colisionBoton(width / 2 - 200, height * 0.93, 200, 40)) {
      estado = 7;
    } else if (colisionBoton(width / 2 + 200, height * 0.93, 200, 40)) {
      estado = 2;
    }
  } else if (estado === 2) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 3;
    }
  } else if (estado === 3) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 4;
    }
  } else if (estado === 4) {
    if (colisionBoton(width / 2 - 200, height * 0.93, 200, 40)) {
      estado = 10;
    } else if (colisionBoton(width / 2 + 200, height * 0.93, 200, 40)) {
      estado = 5;
    }
  } else if (estado === 5) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 6;
    }
  } else if (estado === 6) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 0;
    }
  } else if (estado === 7) {
    if (colisionBoton(width / 2 - 200, height * 0.93, 200, 40)) {
      estado = 9;
    } else if (colisionBoton(width / 2 + 200, height * 0.93, 200, 40)) {
      estado = 8;
    }
  } else if (estado === 9) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 6;
    }
  } else if (estado === 8) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 6;
    }
  } else if (estado === 10) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 11;
    }
  } else if (estado === 11) {
    if (colisionBoton(width * 0.83, height * 0.93, 200, 40)) {
      estado = 6;
    }
  }
}
