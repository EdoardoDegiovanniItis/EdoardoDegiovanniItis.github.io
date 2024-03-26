/*
Degiovanni Edoardo - 4B Robotica

Flappy Bird con 3 gradi di difficoltà: 

  1. facile,
  2. medio,
  3. difficile.

La differenza di difficoltà sta nella vicinanza con la quale le tubature (gli ostacoli) vengono presentate sullo schermo.

I commenti per i 3 livelli sono uguali (sono stati scritti solamente nel caso del livello facile).
*/


//dimensione della finestra di gioco prestabilite

let width = 700
let height = 600


//variabili per caricare il background delle schermate

let bgIniziale
let bgFacile
let bgMedio
let bgDifficile
let bgSceltaLivelli
let bgPausa
let bgGameOver


//variabile per caricare l'immagine del bird

let birdImg;


//variabili che si occupano della gestione dei livelli

let livelloAtt = 0;     //livello attuale, settata a 0 perché bisogna cominciare dalla prima schermata
let livelloPrec = 0;    //livello precedente, usata per poter ritornare alla schermata del livello dalla schermata di pausa


//variabili per gestire il livello di gioco

let bird;   //variabile che gestisce il bird
let ostacoli = [];     //variabile che gestisce l'insieme delle tubature
let gameOver = false;       //variabile che se presa una tubatura carica la schermata di game over
let punteggio = 0;      //variabile che tiene conto del punteggio


function preload() {
  //caricamento delle immagini 

  bgIniziale = loadImage("img/bgIniziale.png");
  bgFacile = loadImage("img/bgLivelloFacile.png");
  bgMedio = loadImage("img/bgLivelloMedio.png");
  bgDifficile = loadImage("img/bgLivelloDifficile.png");
  bgSceltaLivelli = loadImage("img/bgLivelli.png");
  bgPausa = loadImage("img/bgPausa.png");
  birdImg = loadImage('/img/flappy.png');
  bgGameOver = loadImage('/img/bgGameOver.png')
}


function setup() {
  createCanvas(width, height);
  frameRate(120);

  //creazione dell'oggetto della classe Bird e inserimento nel vettore di un nuovo elemento della classe Ostacolo

  bird = new Bird();
  ostacoli.push(new Ostacolo());
}


function draw() {
  switch (livelloAtt)      //più semplice la gestione dei livelli con switch rispetto a if
  {
    case 0:
      background(bgIniziale);
      break;
    case 1:
      background(bgSceltaLivelli);
      break;
    case 2:
      background(bgFacile);
      if (!gameOver)    //se la variabile gameOver è false vuol dire che si è ancora vivi e si sta continuando il gioco
      {
        bird.update();
        bird.show();

        // if (frameCount % 180 == 0)    //ogni 180 frame fa apparire un nuovo ostacolo (numero di frame varia a seconda della difficoltà)
        // {
        //   ostacoli.push(new Ostacolo());
        // }
        if (frameCount > 100 && frameCount % 160 == 0) {
          ostacoli.push(new Ostacolo());
        }

        for (let i = ostacoli.length - 1; i >= 0; i--) {
          ostacoli[i].update();
          ostacoli[i].show();

          if (ostacoli[i].hits(bird))     //se bird colpisce l'ostacolo su cui deve passare allora si scatena il caso gameOver
          {
            gameOver = true;
            break;
          }
          if (ostacoli[i].pass(bird) && !gameOver)    //se invece bird lo supera allora il punteggio viene incrementato
          {
            punteggio++;
          }
          if (ostacoli[i].offscreen())      //elimina tutti gli ostacoli che sono fuori dal canvas
          {
            ostacoli.splice(i, 1);
          }
        }
        mostraPunteggio();    //funzione che mostra il punteggio (aggiornato)
      } else {
        livelloAtt = 6; //se gameOver diventa true vuol dire che si è colpito un ostacolo perciò si stampa GAME OVER  e si stampa il risultato finale
      }
      break;
    case 3:
      background(bgMedio);
      if (!gameOver) {
        bird.update();
        bird.show();

        if (frameCount > 100 && frameCount % 130 == 0) {
          ostacoli.push(new Ostacolo());
        }

        for (let i = ostacoli.length - 1; i >= 0; i--) {
          ostacoli[i].update();
          ostacoli[i].show();

          if (ostacoli[i].hits(bird)) {
            gameOver = true;
            break;
          }
          if (ostacoli[i].pass(bird) && !gameOver) {
            punteggio++;
          }
          if (ostacoli[i].offscreen()) {
            ostacoli.splice(i, 1);
          }
        }
        mostraPunteggio();
      } else {
        livelloAtt = 6;
      }
      break;
    case 4:
      background(bgDifficile);
      if (!gameOver) {
        bird.update();
        bird.show();

        if (frameCount > 100 && frameCount % 100 == 0) {
          ostacoli.push(new Ostacolo());
        }

        for (let i = ostacoli.length - 1; i >= 0; i--) {
          ostacoli[i].update();
          ostacoli[i].show();

          if (ostacoli[i].hits(bird)) {
            gameOver = true;
            break;
          }
          if (ostacoli[i].pass(bird) && !gameOver) {
            punteggio++;
          }
          if (ostacoli[i].offscreen()) {
            ostacoli.splice(i, 1);
          }
        }
        mostraPunteggio();
      } else {
        livelloAtt = 6;
      }
      break;
    case 5:
      background(bgPausa);
      break;
    case 6:
      background(bgGameOver);
      mostraGameOver();
      break;
  }
}


function cambiaLivello(valore)      //gestione delle schermate, valore è una var. parametro che uso per la gestione della scelta dei livelli nella schermata di selezione
{
  if (livelloAtt == 0) {
    livelloAtt = 1;
  }
  else if (livelloAtt == 1) {
    if (valore == 1) {
      livelloAtt += 1;
    }
    else if (valore == 2) {
      livelloAtt += 2;
    }
    else if (valore == 3) {
      livelloAtt += 3;
    }
  }
  else if (livelloAtt == 2 || livelloAtt == 3 || livelloAtt == 4) {
    if (livelloAtt == 2) {
      livelloAtt += 3;
      livelloPrec = 3;
    }
    if (livelloAtt == 3) {
      livelloAtt += 2;
      livelloPrec = 2;
    }
    if (livelloAtt == 4) {
      livelloAtt += 1;
      livelloPrec = 1;
    }
  }
  else if (livelloAtt == 5 && valore == 1) {
    livelloAtt -= 5;
  }
  else if (livelloAtt == 5 && valore == 2)     //in questa if la var. livelloPrec serve per poter tornare alla schermata di gioco scelta in precedenza
  {
    livelloAtt -= livelloPrec;
  }
  else if (livelloAtt == 6 && valore == 1) {
    livelloAtt = 1;
  }
}


function keyPressed() {
  if (livelloAtt == 0 && keyCode == ENTER) {
    cambiaLivello();
  }
  else if (livelloAtt == 1 && key == 1)        //il caso in cui si sceglie il livello facile
  {
    cambiaLivello(1);
  }
  else if (livelloAtt == 1 && key == 2)        //il caso in cui si sceglie il livello medio
  {
    cambiaLivello(2);
  }
  else if (livelloAtt == 1 && key == 3)        //il caso in cui si sceglie il livello difficile
  {
    cambiaLivello(3);
  }
  if (key == ' ' && !gameOver) {
    bird.up();
  }
  else if (keyCode == ESCAPE && (livelloAtt == 2 || livelloAtt == 3 || livelloAtt == 4)) {
    cambiaLivello();
  }

  //gestione delle possibilità nella schermata di pausa

  else if (livelloAtt == 5 && (key == 'F' || key == 'f')) {
    cambiaLivello(1);
    resetGioco();    //in questo modo il gioco si resetta sempre, prima rimaneva sempre lo stesso livello se non si perdeva
  }
  else if (livelloAtt == 5 && (key == 'R' || key == 'r')) {
    cambiaLivello(2);
  }
  else if (livelloAtt == 6 && (key == 'F' || key == 'f')) {
    cambiaLivello(1);
    resetGioco();
  }
}


function resetGioco() {
  gameOver = false;   //se gameOver è false vuol dire che si è pronti per iniziare una nuova partita oppure la si sta già giocando
  ostacoli = [];
  bird = new Bird();
  //ostacoli.push(new Ostacolo());
  punteggio = 0;      //azzerato il punteggio
}


function mostraPunteggio() {
  fill(255);
  textSize(32);
  let testo = punteggio;
  let larghezzaTesto = textWidth(testo);
  text(testo, width - larghezzaTesto - 20, 50);
}


function mostraGameOver() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Punteggio Finale: " + punteggio, width / 2, height / 2 + 170);
}