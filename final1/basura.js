////////CLASE OANTALLAA/////
class Pantalla {
  constructor(fondo, mensaje) {
    this.fondo = fondo;
    this.mensaje = mensaje;
  }

  dibujar() {
    if (this.fondo) {
      image(this.fondo, 0, 0, width, height);
    }
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255);
    text(this.mensaje, width / 2, height / 2);
  }
}
//////fin clase pantalla//////


////////CLASE BASURA//////
class Basura {
  constructor(imgBasura) {
    this.tipo = int(random(imgBasura.length)); // Usa un tipo aleatorio basado en la longitud de imgBasura
    this.reiniciarUbicacion();
    this.despY = 3;
    this.lado = 80;
    this.img = imgBasura[this.tipo]; // Selecciona la imagen adecuada
    
    //puntos correctos imgs
    this.puntosPositivos = [0 , 2, 4]; // imagenes correctas 
  }

  actualizar() {
    this.mover();
    this.dibujar();
  }

  mover() {
    this.y += this.despY;
    if (this.y > height + 50) {
      this.reiniciarUbicacion();
    }
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.lado, this.lado);
    pop();
  }

  reiniciarUbicacion() {
    // Posiciona la basura en un carril aleatorio
    let carril = random(carriles);
    this.x = carril;
    this.y = -random(50, 1000); // Reinicia la basura fuera de la pantalla
  }

  evaluaColision(x_, y_) {
    return dist(this.x, this.y, x_, y_) < this.lado / 2;
  }

  moverHaciaMouse(mouseX, mouseY) {
    let dirX = mouseX - this.x;
    let dirY = mouseY - this.y;
    let magnitude = sqrt(dirX * dirX + dirY * dirY);

    this.despX = (dirX / magnitude) * 4;
    this.despY = (dirY / magnitude) * 4;
  }
   
   esCorrecta(){
     //verifica si la basura es correcta segun puntospositivos
     return this.puntosPositivos.includes(this.tipo);
   }
}
///////FIN BASURA//////
///////CLASE DE BOTONES//////
class Boton {
  constructor(texto, x, y, ancho, alto, colorFondo, colorTexto, callback) {
    this.boton = createButton(texto);
    this.boton.position(x, y);
    this.boton.size(ancho, alto);
    this.boton.style("background-color", colorFondo);
    this.boton.style("color", colorTexto);
    this.boton.style("border-radius", "10px");
    this.boton.mousePressed(callback);
  }

  mostrar() {
    this.boton.show();
  }

  ocultar() {
    this.boton.hide();
  }
}
/////////// fin botones////////





///////CLASE JUEGO///////
class Juego {
  constructor(objetivoPuntos) {
    this.estado = "inicio";
    this.puntos = 0;
    this.objetivoPuntos = objetivoPuntos;
    this.tiempoRestante = 30; // Tiempo límite en segundos
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  reiniciar() {
    this.puntos = 0;
    this.estado = "inicio";
    this.tiempoRestante = 30;
  }

  actualizarPuntos(cantidad) {
    this.puntos += cantidad;
    if (this.puntos >= this.objetivoPuntos) {
      this.cambiarEstado("ganador");
    } else if (this.puntos < 0) {
      this.cambiarEstado("perdedor");
    }
  }

  actualizarTiempo(delta) {
    this.tiempoRestante -= delta;
    if (this.tiempoRestante <= 0) {
      this.cambiarEstado("perdedor");
    }
  }
}
