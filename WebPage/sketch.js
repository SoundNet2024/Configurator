
let MainICON1;
let ButtonICON1;
let BluetoothICON;
let BluetoothICON2;
let SoundNetText;
let RadarBackground;
let ConicGradient;
let RetryIcon;

let MainFont;

let VideoBluetooth;

let Orientation = 0;

let ColorR = 0;
let ColorG = 0;
let ColorB = 155;

let TintVideo = -1.57;

let increaseCircleSize = -1.57;

let Particles2 = [];

let StartPage = false;

let mouseIsReleased = false;

let mouseIsPressedANT = false;

let rotation = 0;

let retryConection = false;

class Particle {

  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(3,4);
    this.xSpeed = random(-1,1);
    this.ySpeed = random(-1,1);
    
  }

  moveParticle() {
    
    if(this.x <= 0 || this.x >= width) {
      
      this.xSpeed = this.xSpeed * -1;
      
    }
    
    if(this.y <= 0 || this.y >= height) {
      
      this.ySpeed = this.ySpeed * -1;
      
    }
    
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
      
  }

  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis < 80) {
        
        ColorR = map((this.x  + element.x) / 2, 0, width, 0, 48);

        ColorG = map((this.x  + element.x) / 2, 0, width, 230, 80);
        
        strokeWeight(4);
        stroke(ColorR, ColorG, ColorB);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];

function preload() {
  
  MainFont = loadFont('Assets/ARLRDBD.ttf');
  
  MainICON1 = loadImage("Assets/MainLOGO.png");
  ButtonICON1 = loadImage("Assets/ButtonICON1.png");
  VideoBluetooth = createVideo("Assets/Bluetooth background2.mp4");
  BluetoothICON = loadImage("Assets/BluetoothICON.png");
  BluetoothICON2 = loadImage("Assets/BluetoothICON2.png");
  SoundNetText = loadImage("Assets/SoundNetText.png");
  RadarBackground = loadImage("Assets/RadarBackground.png");
  ConicGradient = loadImage("Assets/ConicGradient.png");
  RetryIcon = loadImage("Assets/RetryIcon.png");
  
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  frameRate(60);
  
  VideoBluetooth.hide();
  
  determineOrientation();
  
  for(let i = 0;i<(width+height)*0.08;i++){
    particles.push(new Particle());
  }
  
  imageMode(CENTER);
  
  textFont(MainFont);
  
  textAlign(CENTER, CENTER);
  
}

function draw() {
  
  if (mouseIsPressedANT == true && mouseIsPressed == false) {
    
    mouseIsReleased = true;
    
  } else {
    
    mouseIsReleased = false;
    
  }
  
  mouseIsPressedANT = mouseIsPressed;
  
  if (increaseCircleSize <= 1.5) {
  
  background(50);
  
  for(let i = 0;i<particles.length;i++) {
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  
  let p = new Particle2();
  Particles2.push(p);
  
  for (var i = 0; i < Particles2.length; i++) {
    
    Particles2[i].update();
    Particles2[i].show();
    
  }
  
  }
  
    if (StartPage == true && increaseCircleSize < 1.57) {
        
        increaseCircleSize = increaseCircleSize + 0.02/frameRate()*60;
        
    }
  
    image(SoundNetText, width/2, height*0.12, height*0.6, height*0.2);
  
    if (Orientation == 0) {
      
    push();
      
    if (mouseX >= width/2 - height*0.4/2 && mouseX <= width/2 + height*0.4/2 && mouseY >= height*0.9 - height*0.16/2 && mouseY <= height*0.9 + height*0.16/2 && StartPage == false) {
       
      if (mouseIsPressed == true) {
       
        tint(200, 200, 200);
        
      }
      
      if (mouseIsReleased == true) {
        
        StartPage = true;
        
        VideoBluetooth.play();
        
      }
      
    }
      
    image(ButtonICON1, width/2, height*0.9, height*0.4, height*0.16);
      
    pop();
      
    image(MainICON1, width/2, height/2, height/2 + map(sin(increaseCircleSize), -1, 1, 0, height*2), height/2 + map(sin(increaseCircleSize), -1, 1, 0, height*2));
      
    if (dist(mouseX, mouseY, width/2, height/2) < height/2/2 && mouseIsPressed == true && StartPage == false) {
      
      StartPage = true;
      
      VideoBluetooth.play();
      
    }
  
  } else {
    
    push();
    
      if (mouseX >= width/2 - height*0.4/2 && mouseX <= width/2 + height*0.4/2 && mouseY >= height*0.9 - height*0.16/2 && mouseY <= height*0.9 + height*0.16/2 && StartPage == false) {
        
      if (mouseIsPressed == true) {
       
        tint(200, 200, 200);
        
      }
        
      if (mouseIsReleased == true) {
        
        StartPage = true;
        
        VideoBluetooth.play();
        
      }
      
    }
    
    image(ButtonICON1, width/2, height*0.9, height*0.4, height*0.16);
    
    pop();
    
    image(MainICON1, width/2, height/2, width/2 + map(sin(increaseCircleSize), -1, 1, 0, width*2), width/2 + map(sin(increaseCircleSize), -1, 1, 0, width*2));
    
    if (dist(mouseX, mouseY, width/2, height/2) < width/2/2 && mouseIsPressed == true && StartPage == false) {
      
      StartPage = true;
      
      VideoBluetooth.play();
      
      
    }
    
  }
  
    if (StartPage == true) {
      
      rotation = rotation - 60/frameRate() * 0.08;
      
      noStroke();
      fill(40, 40, 40, map(sin(increaseCircleSize), -1, 1, 0, 255));
      rect(0, 0, width, height);
      
      
      if (VideoBluetooth.time() >= 22) {
          
        TintVideo = map(VideoBluetooth.time(), 22, 25, -1.57, 1.57);
          
      }
      
      push();
      
      tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 255) - map(sin(TintVideo), -1, 1, 0, 255));
      
      if (retryConection == true) {
        
        if (VideoBluetooth.time() <= 2) {
          
          tint(255, 255, 255, map(VideoBluetooth.time(), 0, 2, 0, 255));
        
        } else {
          
         retryConection = false; 
          
        }
          
      }
      
      image(VideoBluetooth, width/2, height/2, width, height);
      
      if (Orientation == 0) {
        
        if (VideoBluetooth.time() > 3) {
        
        image(RadarBackground, width/2, height*0.3, map(sin(TintVideo), -1, 1, height*0.5, 0), map(sin(TintVideo), -1, 1, height*0.5, 0));
          
        } else if (VideoBluetooth.time() <= 3 && VideoBluetooth.time() >= 2) {
          
        image(RadarBackground, width/2, height*0.3, map(VideoBluetooth.time(), 2, 3, 0, height*0.5), map(VideoBluetooth.time(), 2, 3, 0, height*0.5));
          
        }
        
        push();
        
        tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 100) - map(sin(TintVideo), -1, 1, 0, 100));
        
        translate(width/2, height*0.3);
        
        rotate(rotation);
        
        if (VideoBluetooth.time() > 3) {
        
        image(ConicGradient, 0, 0, map(sin(TintVideo), -1, 1, height*0.5, 0), map(sin(TintVideo), -1, 1, height*0.5, 0));
        
        } else if (VideoBluetooth.time() <= 3 && VideoBluetooth.time() >= 2) {
        
        image(ConicGradient, 0, 0, map(VideoBluetooth.time(), 2, 3, 0, height*0.5), map(VideoBluetooth.time(), 2, 3, 0, height*0.5));
        
        }
        
        pop();
      
        image(BluetoothICON, width/2, height*0.3, map(sin(TintVideo), -1, 1, height*0.3, 0), map(sin(TintVideo), -1, 1, height*0.3, 0));
        
      } else {
        
        if (VideoBluetooth.time() > 3) {
        
        image(RadarBackground, width/2, height*0.3, map(sin(TintVideo), -1, 1, width*0.5, 0), map(sin(TintVideo), -1, 1, width*0.5, 0));
          
        } else if (VideoBluetooth.time() <= 3 && VideoBluetooth.time() >= 2) {
          
        image(RadarBackground, width/2, height*0.3, map(VideoBluetooth.time(), 2, 3, 0, width*0.5), map(VideoBluetooth.time(), 2, 3, 0, width*0.5));
          
        }
        
        push();
        
        tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 100) - map(sin(TintVideo), -1, 1, 0, 100));
        
        translate(width/2, height*0.3);
        
        rotate(rotation);
        
        if (VideoBluetooth.time() > 3) {
        
        image(ConicGradient, 0, 0, map(sin(TintVideo), -1, 1, width*0.5, 0), map(sin(TintVideo), -1, 1, width*0.5, 0));
        
        } else if (VideoBluetooth.time() <= 3 && VideoBluetooth.time() >= 2) {
        
        image(ConicGradient, 0, 0, map(VideoBluetooth.time(), 2, 3, 0, width*0.5), map(VideoBluetooth.time(), 2, 3, 0, width*0.5));
        
        }
        
        pop();
        
        image(BluetoothICON, width/2, height*0.3, map(sin(TintVideo), -1, 1, width*0.3, 0), map(sin(TintVideo), -1, 1, width*0.3, 0));
        
      }
        
      pop();
      
      fill(255);

        
      if (Orientation == 0) {
      
        image(BluetoothICON2, width/2, height*0.3, map(sin(TintVideo), 1, -1, height*0.3, 0), map(sin(TintVideo), 1, -1, height*0.3, 0));
        
        image(RetryIcon, width/2, height*0.7, map(sin(TintVideo), 1, -1, height*0.2, 0), map(sin(TintVideo), 1, -1, height*0.2, 0));
        
        textSize(map(sin(TintVideo), 1, -1, height*0.04, 0));
        
        text("Sorry no bluetooth devices found", width/2, height/2);
        
        if (sin(TintVideo) >= 0.9 && mouseX >= width/2 - height*0.2 && mouseX <= width/2 + height*0.2 && mouseY >= height*0.7 - height*0.2 && mouseY <= height*0.7 + height*0.2) {
           
          cursor(HAND);
          
          if (mouseIsPressed == true) {
            
          retryConection = true;
          
          StartPage = true;
          
          VideoBluetooth.stop();
      
          VideoBluetooth.play();
          
          TintVideo = -1.57;

        //  increaseCircleSize = -1.57;
          
          }
            
        } else {
          
         cursor(ARROW); 
          
        }
        
        text("Retry", width/2, height*0.8);
        
      } else {
        
        image(BluetoothICON2, width/2, height*0.3, map(sin(TintVideo), 1, -1, width*0.3, 0), map(sin(TintVideo), 1, -1, width*0.3, 0));
        
        image(RetryIcon, width/2, height*0.7, map(sin(TintVideo), 1, -1, width*0.2, 0), map(sin(TintVideo), 1, -1, width*0.2, 0));
        
        textSize(map(sin(TintVideo), 1, -1, width*0.04, 0));
        
        text("Sorry no bluetooth devices found", width/2, height/2);
        
        if (sin(TintVideo) >= 0.9 && mouseX >= width/2 - width*0.2 && mouseX <= width/2 + width*0.2 && mouseY >= height*0.7 - width*0.2 && mouseY <= height*0.7 + width*0.2) {
           
          cursor(HAND);
          
          if (mouseIsPressed == true) {
            
          retryConection = true;
          
          StartPage = true;
          
          VideoBluetooth.stop();
      
          VideoBluetooth.play();
          
          TintVideo = -1.57;

        //  increaseCircleSize = -1.57;
          
          }
            
        } else {
          
         cursor(ARROW); 
          
        }
        
        text("Retry", width/2, height*0.8);
        
      }
    
  
    }
  
}

function determineOrientation() {
  if (width > height) {
    //console.log("Landscape orientation");
    Orientation = 0;
  } else {
    //console.log("Portrait orientation");
    Orientation = 1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  determineOrientation();
  
  particles.splice(this, particles.length);
  
  for(let i = 0;i<(width+height)*0.08;i++){
    particles.push(new Particle());
  }
  
}

class Particle2 {
  constructor() {
    
    
  if (Orientation == 0) {
  
    this.pos = p5.Vector.random2D().mult(height/4.3);
  
  } else {
    
    this.pos = p5.Vector.random2D().mult(width/4.3);
    
  }
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.w = random(3, 5);
  }
  update() {
    
    this.vel.add(this.acc);
    this.pos. add(this.vel);
    
  }
  isOffScreen() {
    // Verifica si la partícula está fuera de la pantalla
    return this.pos.x < 0 || this.x > width || this.pos. y < 0 || this.y > height;
  }
  show () {
    noStroke();
    
    if (Orientation == 0) {
      fill(255, 255, map(dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2), 0, width/2.1, 255, 0), map(dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2), 0, width/2.1, 255, 0));
    } else {
      fill(255, 255, map(dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2), 0, height/2.1, 255, 0), map(dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2), 0, height/2.1, 255, 0));      
    }
    ellipse(this.pos.x + width/2, this.pos.y + height/2, this.w, this.w);
    
    if (dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2) > width/2 && Orientation == 0) {
        
      Particles2.splice(this, 1);
        
    }
    
    if (dist(this.pos.x + width/2, this.pos.y + height/2, width/2, height/2) > height/2 && Orientation == 1) {
        
      Particles2.splice(this, 1);
        
    }
    
  }
}
