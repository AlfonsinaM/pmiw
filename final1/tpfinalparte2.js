//Morales Alfonsina 119093/5 y Sarah Recki 119124/4 
// 
let basura = []; // Arreglo para los objetos de la clase Basura
let cant = 10;
let puntos = 0;
let imgBasura = []; // array para las imágenes de basura
let imgFondo; // fondo
let carriles = [];
let estado = "inicio"; // estado inicial de la pantalla
let botonInicio;
let imgFondoInicio;
let objetivoPuntos = 3;
let botonCreditos;
let botonReiniciar;

function preload() {
  // Cargar imágenes en el array imgBasura
  imgBasura[0] = loadImage("data/basura_0.png");
  imgBasura[1] = loadImage("data/basura_1.webp");
  imgBasura[2] = loadImage("data/basura_2.jpg");
  imgBasura[3] = loadImage("data/basura_3.jpg");
  imgBasura[4] = loadImage("data/basura_4.png");
  imgBasura[5] = loadImage("data/basura_5.jpg");
  imgBasura[6] = loadImage("data/basura_6.png");
  imgBasura[7] = loadImage("data/basura_7.webp");
  imgFondo = loadImage("data/fondo.jpg");
  imgFondoInicio = loadImage("data/incio.jpeg");
}

function setup() {
  createCanvas(640, 480);

  // Definir los carriles dividiendo el canvas en 3
  carriles = [width / 6, width / 2, 5 * width / 6];

  // Crear objetos de basura
  for (let i = 0; i < cant; i++) {
    basura[i] = new Basura(imgBasura); // Pasa el array de imágenes al constructor
  }

  // Crear el botón de inicio y posicionarlo
  botonInicio = createButton("Iniciar Juego");
  botonInicio.position(250, 370);
  botonInicio.mousePressed(iniciarJuego);
  botonInicio.size(130,70); //tamaño boton 
  botonInicio.style("background-color", "#4CAF50"); // Color de fondo
  botonInicio.style("color", "white");              // Color del texto
  botonInicio.style("border-radius", "10px"); //bordes redondos
  
  //boton de pntalla creditos
  botonCreditos = createButton("Creditos");
  botonCreditos.position(250, 370);
  botonCreditos.mousePressed(mostrarCreditos);
  botonCreditos.size(130, 70); //tmaño
  botonCreditos.style("background-color", "#4CAF50"); // color de fondo
  botonCreditos.style("color", "white");              // color del texto
  botonCreditos.style("border-radius", "10px"); //bordes redondos
  
   // Crear botón de reinicio
  botonReiniciar = createButton("Reiniciar");
  botonReiniciar.position(250, 370);
  botonReiniciar.size(130, 50);
  botonReiniciar.style("background-color", "#FF0000");
  botonReiniciar.style("color", "white");
  botonReiniciar.style("border-radius", "10px");
  botonReiniciar.mousePressed(reiniciarJuego);
  botonReiniciar.hide(); // Ocultamos el botón al inicio
 
}

function draw() {
   if (estado === "inicio") {
    mostrarPantallaInicio();
    botonCreditos.hide(); // no mostrae botón de créditos en la pantalla de inicio
    botonInicio.show();   // mostrar botón de inicio en la pantalla de inicio
    botonReiniciar.hide(); // Oculta el botón de reinicio
  } else if (estado === "juego") {
    jugar();
    botonCreditos.hide();
    botonInicio.hide();   
    botonReiniciar.hide(); // Oculta el botón de reinicio
  } else if (estado === "ganador") {
    mostrarPantallaGanador();
    botonCreditos.show(); // mostrar botón de créditos en la pantalla de ganador
    botonInicio.hide();   // Ocultar botón de inicio en la pantalla de ganador
    botonReiniciar.hide(); // Oculta el botón de reinicio
  } else if (estado === "creditos") {
    mostrarPantallaCreditos();
    botonCreditos.hide();
    botonInicio.hide(); 
    botonReiniciar.show(); // botón de reinicio
  } else if (estado === "perdedor") {
    mostrarPantallaPerdedor();
    botonCreditos.show();
    botonInicio.hide();
    botonReiniciar.hide(); // oculta el botón de reinicio
  }

}

function mostrarPantallaInicio() {
  
  image(imgFondoInicio, 0, 0 ,width,height);
  // conf de los textos de la pantalla
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

function iniciarJuego() {
  estado = "juego";
  botonInicio.hide(); // Oculta el botón cuando comienza el juego
}

function jugar() {
  // Dibuja la imagen de fondo
  image(imgFondo, 0, 0, width, height);

  // Actualiza y dibuja cada objeto de basura
  for (let i = 0; i < cant; i++) {
    basura[i].actualizar();
  }

  // Muestra los puntos
  fill(0);
  textSize(40);
  text(puntos, 10, 50);

  // Evalúa colisiones
  for (let i = 0; i < cant; i++) {
    if (basura[i].evaluaColision(mouseX, mouseY)) {
      if (basura[i].esCorrecta ()) { // Si la imagen es correcta
        puntos++;
      } else {
        puntos--;
        console.log("incorrecto -1 punto");
      }
      basura[i].reiniciarUbicacion();
    }
  }
    // verifica si se ha alcanzado el puntaje objetivo
  if (puntos >= objetivoPuntos) {
    estado = "ganador"; // Cambia el estado a "ganador" si alcanza obje
    }else if (puntos < 0){
      estado = "perdedor";
    }
}

  function mostrarPantallaGanador() {
    image(imgFondoInicio, 0, 0 ,width,height);
    textAlign(CENTER, CENTER);
    textSize(30);
    let textWidthValue = textWidth("Felicidades lograste crear a Froky"); //cuadrado sombra
     fill(0, 0, 0, 150); // negro con transparencia
  rect(width / 2 - textWidthValue / 2 - 10, height / 2 - 25, textWidthValue + 20, 50, 10); //  bordes redondeados
    fill(255);
    text("Felicidades lograste crear a Froky",width /2, height /2);
  }
  
  function mostrarPantallaPerdedor() {
  image(imgFondoInicio, 0, 0, width, height);
  textAlign(CENTER, CENTER);
  textSize(30);
  let textWidthValue = textWidth("¡Lo siento! Has perdido el juego.");
  fill(150, 0, 0, 180);
  rect(width / 2 - textWidthValue / 2 - 10, height / 2 - 25, textWidthValue + 20, 50, 10);
  fill(255);
  text("¡Lo siento! Has perdido el juego.", width / 2, height / 2);
}
  
  
 function mostrarPantallaCreditos(){
     image(imgFondoInicio, 0, 0 ,width,height);
      textAlign(CENTER,CENTER);
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
  
 }
 
  function mostrarCreditos (){
    estado = "creditos";
    botonInicio.hide();
    botonCreditos.hide();
  }
  
  function reiniciarJuego(){
     estado = "inicio"; // Regresa al estado inicial
  puntos = 0; // Reinicia el puntaje
  botonReiniciar.sow(); // Oculta el botón de reinicio
}
  
function mousePressed() {
 if (estado === "juego") { //  estado de "juego"
    for (let i = 0; i < cant; i++) {
      // verificar si el clic está dentro de la imagen de basura
      if (basura[i].evaluaColision(mouseX, mouseY)) {
        // cmprobar si es una imagen correcta que da puntos
        if ([0,2,4].includes(basura[i].tipo)) { // las imagenes correctas
          puntos++; // Sumar puntos
          console.log("¡Correcto! +1 punto");
        } else {
          puntos--; // Restar puntos si es incorrecto
          console.log("¡Incorrecto! -1 punto");
        }
        basura[i].reiniciarUbicacion(); // reiniciar la posición de la basura 
         //ver si alcanza los puntos
         if(puntos >= objetivoPuntos){
           estado = "ganador"; // cambia estado a fganador
         }
         else if (puntos < 0 ){
           estado = "perdedor";
         }
      }
    }
  }
}
