class Bird 
{
  constructor() 
  {
    this.y = height / 2;    //posizione iniziale del bird per quanto riguarda y
    this.x = 64;      //posizione iniziale del bird per quanto riguarda x
    this.gravity = 0.6;     //gravità applicata al bird, maggiore è il valore maggiore è la gravità
    this.lift = -10;      //velocità di salita applicata al bird
    this.velocity = 0;      //velocità verticale corrente del bird. Se è positiva, si sta muovendo verso il basso; se è negativa, si sta muovendo verso l'alto. La gravità aumenterà continuamente questa velocità verso il basso, mentre l'applicazione della forza di sollevamento la ridurrà, facendolo muovere verso l'alto. Avendola inizialmente a 0 il bird sarà fermo

    this.width = 50;
    this.height = 35;
  }

  update() 
  {
    this.velocity += this.gravity;    //applica la gravità alla velocità
    this.y += this.velocity;    //aggiorna la posizione basata sulla velocità

    //controllo collisione con il bordo inferiore del canvas, io ho deciso che non si muore ma ci si può "appoggiare"
    if (this.y > height - this.height) 
    {
      //this.y = height - this.height;    //imposta Y al bordo inferiore per impedire la discesa
      //this.velocity = 0;    //azzera la velocità per fermare ulteriori cadute
      gameOver = true;
    }

    //controllo collisione con il bordo superiore del canvas
    if (this.y < 0) 
    {
      //this.y = 0;     //imposta Y in cima per impedire ulteriori salite
      //this.velocity = 0;  //azzera la velocità
      gameOver = true;
    }
  }

  show()      //il bird viene mostrato
  {
    image(birdImg, this.x, this.y, this.width, this.height);
  }

  up() 
  {
    this.velocity += this.lift;       //applica una forza verso l'alto quando l'uccello "flappa"
  }
}
