//variabili per controllare la distanza e l'apertura tra le colonne

let minPipeSpacing = 300;     //spazio minimo tra le colonne
let maxPipeSpacing = 430;     //spazio massimo tra le colonne
let minOpening = 120;     //altezza minima dell'apertura tra le colonne
let maxOpening = 250;     //altezza massima dell'apertura tra le colonne


class Ostacolo {
  constructor() {
    let spacing = random(minOpening, maxOpening);     //sceglie un'apertura casuale all'interno dei limiti
    let center = random(spacing + minPipeSpacing, height - (spacing + minPipeSpacing));     //calcola il centro dell'apertura con un margine dai bordi

    this.top = center - spacing / 2;      //parte superiore della colonna
    this.bottom = height - (center + spacing / 2);    //parte inferiore della colonna
    this.x = width;
    this.w = 30;      //larghezza dell'ostacolo
    this.speed = 2;   //velocità con cui compaiono le tubature
    
    this.passed = false;
  }


  update() {
    this.x -= this.speed;
  }


  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }


  offscreen() {
    return this.x < -this.w;
  }


  hits(bird) {    //tutti i controlli necessari per verificare se il bird colpisce l'ostacolo
    if ((bird.y < this.top || bird.y + bird.height > height - this.bottom)) {
      if ((bird.x + bird.width > this.x && bird.x < this.x + this.w)) {
        return true;
      }
    }
    return false;
  }


  pass(bird) {
    if (!this.passed && bird.x > this.x + this.w) {

      this.passed = true;     //imposta il tubo come superato
      return true;
    }
    return false;
  }
}
