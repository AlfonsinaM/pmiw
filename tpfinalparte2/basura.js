////////CLASE BASURA///////
class Basura {
  constructor(imagenes) {
    this.imagenes = imagenes;
    this.tipo = int(random(imagenes.length)); // Índice aleatorio para el tipo de basura
    this.img = imagenes[this.tipo];
    this.x = random(width);
    this.y = random(-200, -50);
    this.velocidad = random(2, 5);
  }

  actualizar() {
    this.y += this.velocidad;
    if (this.y > height) {
      this.reiniciarUbicacion();
     
    }
    image(this.img, this.x, this.y, 70, 70);
  }

  evaluaColision(px, py) {
    return px > this.x && px < this.x + 70 && py > this.y && py < this.y + 70;
  }

  esCorrecta() {
    // Define qué tipos de basura son correctos (ejemplo: los índices 0, 2, 4)
    return [0, 2, 4].includes(this.tipo);
  }

  reiniciarUbicacion() {
    this.x = random(width);
    this.y = random(-200, -50);
    this.tipo = int(random(this.imagenes.length));
    this.img = this.imagenes[this.tipo];
  }
}
/////////CLASE JUEGO///////
class Juego {
  constructor() {
    this.estado = Estados.INICIO;
    this.puntos = 0;
    this.basura = [];
    this.botonInicio = null;
    this.botonCreditos = null;
    this.botonReiniciar = null;
  }

  preload() {
    // Cargar imágenes
    Config.imgBasura = [
      loadImage("data/basura_0.png"),
      loadImage("data/basura_1.webp"),
      loadImage("data/basura_2.jpg"),
      loadImage("data/basura_3.jpg"),
      loadImage("data/basura_4.png"),
      loadImage("data/basura_5.jpg"),
      loadImage("data/basura_6.png"),
      loadImage("data/basura_7.webp"),
    ];
    Config.imgFondo = loadImage("data/fondo.jpg");
    Config.imgFondoInicio = loadImage("data/incio.jpeg");
  }

  setup() {
    createCanvas(640, 480);

    // Inicializar la basura
    for (let i = 0; i < 10; i++) {
      this.basura.push(new Basura(Config.imgBasura));
    }

    // Botón de inicio
    this.botonInicio = createButton("Iniciar Juego");
    this.botonInicio.position(250, 370);
    this.botonInicio.size(130, 70);
    this.botonInicio.style("background-color", "#4CAF50");
    this.botonInicio.style("color", "white");
    this.botonInicio.style("border-radius", "10px");
    this.botonInicio.mousePressed(() => this.iniciar());

    // Botón de créditos
    this.botonCreditos = createButton("Créditos");
    this.botonCreditos.position(250, 370);
    this.botonCreditos.size(130, 70);
    this.botonCreditos.style("background-color", "#4CAF50");
    this.botonCreditos.style("color", "white");
    this.botonCreditos.style("border-radius", "10px");
    this.botonCreditos.mousePressed(() => this.mostrarCreditos());
    this.botonCreditos.hide();

    // Botón de reinicio
    this.botonReiniciar = createButton("Reiniciar");
    this.botonReiniciar.position(250, 370);
    this.botonReiniciar.size(130, 50);
    this.botonReiniciar.style("background-color", "#FF0000");
    this.botonReiniciar.style("color", "white");
    this.botonReiniciar.style("border-radius", "10px");
    this.botonReiniciar.mousePressed(() => this.reiniciar());
    this.botonReiniciar.hide();
  }

  iniciar() {
    this.estado = Estados.JUEGO;
    this.botonInicio.hide();
    this.botonCreditos.hide();
  }

  mostrarCreditos() {
    this.botonCreditos.mousePressed
    this.estado = Estados.CREDITOS;
    this.botonInicio.hide();
    this.botonCreditos.hide();
    this.botonReiniciar.hide();
  }

  reiniciar() {
    this.botonReiniciar.mousePressed
    this.estado = Estados.INICIO;
    this.puntos = 0;
    this.botonInicio.show();
    this.botonCreditos.hide();
    this.botonReiniciar.hide();
  }

  jugar() {
    image(Config.imgFondo, 0, 0, width, height);
    for (let basura of this.basura) {
      basura.actualizar();
    }

    fill(0);
    textSize(40);
    text(this.puntos, 10, 50);
  }

  dibujar() {
    if (this.estado === Estados.INICIO) {
      this.mostrarPantallaInicio();
    } else if (this.estado === Estados.JUEGO) {
      this.jugar();
    } else if (this.estado === Estados.GANADOR) {
      this.mostrarPantallaGanador();
    } else if (this.estado === Estados.PERDEDOR) {
      this.mostrarPantallaPerdedor();
    } else if (this.estado === Estados.CREDITOS) {
      this.mostrarPantallaCreditos();
    }
  }

  mousePresionado(x, y) {
    if (this.estado === Estados.JUEGO) {
      for (let basura of this.basura) {
        if (basura.evaluaColision(x, y)) {
          if (basura.esCorrecta()) {
            this.puntos++;
          } else {
            this.puntos--;
          }
          basura.reiniciarUbicacion();
        }
      }

      if (this.puntos >= Config.objetivoPuntos) {
        this.estado = Estados.GANADOR;
      } else if (this.puntos < 0) {
        this.estado = Estados.PERDEDOR;
      }
    }
  }

  mostrarPantallaInicio() {
    image(Config.imgFondoInicio, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(30);
  // Color de fondo del texto
  fill(200, 200, 200, 180); // Color gris claro con transparencia
  let textWidthValue = textWidth("Intenta crear a forky de manera correcta!");
  rect(width / 2 - textWidthValue / 2 - 10, height / 3 - 50, textWidthValue + 20, 50, 10);
  fill(0);
  text("Intenta crear a forky de manera correcta!", width / 2, height / 3 - 25);
  //explicacion
  textSize(17);
  fill(200, 200, 200, 180);
  let textWiddthValue = textWidth("Haz clic en los objetos correctos para sumar puntos. Evita los incorrectos");
  rect(width / 2 - textWidthValue /2 - 10,height /3 + 20,textWidthValue + 20,50,10);
  fill(0);
  text("Haz clic en los objetos correctos para sumar puntos. Evita los incorrectos", width /2, height / 3 + 45);
}

  mostrarPantallaGanador() {
    image(Config.imgFondoInicio, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(30);
    let textWidthValue = textWidth("¡Lo lograste!");
  fill(150, 200, 200, 180);
  rect(width / 2 - textWidthValue / 2 - 10, height / 2 - 25, textWidthValue + 20, 50, 10);
  fill(255);
    text("¡Lo lograste!", width / 2, height / 2);
    // Mostrar el botón de créditos
  this.botonCreditos.show();
  }
  

  mostrarPantallaPerdedor() {
   image(Config.imgFondoInicio, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(30);
let textWidthValue = textWidth("¡Lo siento parece que no pudiste lograrlo!");
  fill(150, 0, 0, 180);
  rect(width / 2 - textWidthValue / 2 - 10, height / 2 - 25, textWidthValue + 20, 50, 10);
  fill(255);
    text("¡Lo siento parece que no pudiste lograrlo!", width / 2, height / 2);
 // Mostrar el botón de créditos
  this.botonCreditos.show();
}

  mostrarPantallaCreditos() {
     image(Config.imgFondoInicio, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(20);
   //info pantalla creditos
       textSize(20);
        let creditos = "Morales Alfonsina 119093/5     Sarah Recki 119124/4";
  let textWidthValue = textWidth(creditos); //ancho del texto
  fill(0, 0, 0, 150); // Fondo del rectángulo
  rect(width / 2 - textWidthValue / 2 - 10, height / 2 - 25, textWidthValue + 20, 50, 10); 
  fill(255); // blanco
  text(creditos, width / 2, height / 2); // créditos centrados
  
  let mensaje = "Profesor ; David Bedoian";
  let textWidthValue2 = textWidth(mensaje);
  fill(0, 0, 0, 150); // Fondo del rectángulo
  rect(width / 2 - textWidthValue2 / 2 - 10, height / 2 + 35, textWidthValue2 + 20, 50, 10); //  abajo
  fill(255); // Blanco
  text(mensaje, width / 2, height / 2 + 60); //  línea centrada
  
   this.botonReiniciar.show();

  }
}

let juego;

function preload() {
  juego = new Juego();
  juego.preload();
}

function setup() {
  juego.setup();
}

function draw() {
  juego.dibujar();
 if (juego.estado === Estados.inicio) {
   //pntalla inicio
    juego.mostrarPantallaInicio();
    juego.botonCreditos.hide();
    juego.botonInicio.show();
    juego.botonReiniciar.hide();
  } else if (juego.estado === Estados.juego) {
    //pntalla juego
    juego.jugar();
    juego.botonCreditos.hide();
    juego.botonInicio.hide();
    juego.botonReiniciar.hide();
  } else if (juego.estado === Estados.ganador) {
    //pntalla ganador
    juego.mostrarPantallaGanador();
    juego.botonCreditos.show(); // Mostrar el botón de créditos
    juego.botonInicio.hide();
    juego.botonReiniciar.hide();
  } else if (juego.estado === Estados.perdedor) {
    
   juego.mostrarPantallaPerdedor();
    juego.botonCreditos.show(); // Mostrar el botón de créditos
    juego.botonInicio.hide();
    juego.botonReiniciar.hide();
  } else if (juego.estado === Estados.creditos) {
    juego.mostrarPantallaCreditos();
    juego.botonCreditos.hide();
    juego.botonInicio.hide();
    juego.botonReiniciar.show(); // Mostrar el botón de reinicio
  }
  
  
  
}

function mousePressed() {
  juego.mousePresionado(mouseX, mouseY);
}
