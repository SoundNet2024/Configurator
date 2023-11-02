let MainIcon;

function setup() {
  createCanvas(400, 400);
  
  MainIcon = loadImage("SoundNetICON.png");
}

function draw() {
  background(255);
  image(MainIcon, 0, 0, height, height);
}