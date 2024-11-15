function inicializar() {
  // inicialización de los textos y botones
  estado = 0;
  textos[0] = "Bonnie, es una niña creativa, hace un juguete improvisado llamado Forky con basura. Esta lo lleva a casa y se lo presenta a los demás. ¿Woody decide protegerlo?";
  textos[1] = "A pesar de la inseguridad de Forky y su deseo de ser basura, Woody toma el papel de lider para ayudarlo a entender su nuevo rol como juguete.";
  textos[2] = "Durante el viaje en carretera, Forky escapa y es retenido en la tienda de antiguedades, Woody lo logra rescatar.";
  textos[3] = "En la aventura se encuentran con Bo Peep, quien ahora es un juguete independiente. ¿El decide quedarse con ella?";//Juntos tienen que encontrar la manera de volver con Bonnie
  textos[4] = "Al final, Woody decide quedarse con Bo Peep, eligiendo una vida libre y sin atadurasa un niño. Se despide emotivamente de Forky y el resto de sus amigos, quienes regresan con Bonnie mientras él se embarca en una nueva aventura.";
  textos[5] = "Forky al estar hecho de basura ¿Se sigue sintiendo iseguro?";
  textos[6] = "Forky acaba en un camión de basura, donde se desarma y muere.Woody se arrepiente de no haberlo protegido, pero es demasiado tarde.";
  textos[7] = "Woody decide que ya no es su deber cuidar a Forky y este se va en busca de una nueva vida.";
  textos[8] = "Woody decide hablar con Forky luego de todas las aventuras que superaron juntos.";
  textos[9] = "Woody regresa a la casa de Bonnie junto a Forky donde viven haciendo felices a la niña.";
  textos[10] = "Sarah Recki Fernandez - 119124/4  Morales Alfonsina 119093/5 \n Profesores: David Bedoian y Lisandro Aguiar";

  boton[0] = "Iniciar";
  boton[1] = "Sí";
  boton[2] = "Siguiente";
  boton[3] = "Reiniciar";
  boton[4] = "Créditos";

  boton2[0] = "No";
}

function imprimirTexto(i, x, y, pos) {
  let proporcion = width * 0.03; // Ajuste proporcional del texto
  textSize(proporcion);
  fill(0);
  stroke(100);
  textAlign(pos);
  text(textos[i], x, y, width * 0.9); // Ajuste del ancho máximo del texto
}
//ajuste de donde tiene que estar y sus posiciones

function colisionBoton(x, y, w, h) {
  // Función para detectar colisiones del botón
  return (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2);
}

function dibujarboton1(txt, x, y, w, h) {
  push();
  rectMode(CENTER);
  noStroke();
  if (colisionBoton(x, y, w, h)) {
    fill(200);
  } else {
    fill(100);
  }
  rect(x, y, w, h);
  textAlign(CENTER, CENTER);
  fill(255);
  text(txt, x, y);
  pop();
}

function dibujarboton2(txt_btn_A, txt_btn_B) {
  push();
  dibujarboton1(txt_btn_A, width / 2 - 200, height * 0.93, 200, 40);
  dibujarboton1(txt_btn_B, width / 2 + 200, height * 0.93, 200, 40);
  pop();
}

// Función para la pantalla de inicio
function pantallaInicio(imgFondo) {
  push();
  background(0);
  image(imgFondo, 0, 0, width, height); // Muestra la imagen como fondo
  dibujarboton1(boton[0], width * 0.83, height * 0.93, 200, 40); // Botón de iniciar
  pop();
}

// Función para la pantalla siguiente
function pantallaSiguiente(i, imgFondo) {
  push();
  background(100);
  image(imgFondo, 0, 0, width, height); // Muestra la imagen como fondo
  imprimirTexto(i, 20, 50, LEFT);
  dibujarboton1(boton[2], width * 0.83, height * 0.93, 200, 40); // Botón de siguiente
  pop();
}

function pantallaBotones(i, imgFondo) {
  push();
  background(255, 0, 0);
  image(imgFondo, 0, 0, width, height);
  imprimirTexto(i, 20, height*0.05, LEFT);
  dibujarboton2(boton2[0], boton[1]);
  pop();
}

function pantallaCreditos(i, imgFondo) {
  push();
  background(0, 255, 0);
  image(imgFondo, 0, 0, width, height);
  imprimirTexto(i, 20, height*0.05, CENTER);
  dibujarboton1(boton[4], width*0.83, height*0.93, 200, 40);
  pop();
}

function pantallaReiniciar(i,imgFondo) {
  push();
  image(imgFondo, 0, 0, width, height);
  dibujarboton1(boton[3], width*0.83, height*0.93, 200, 40);
 imprimirTexto(i,20, height*0.8, CENTER);
  pop();
}
