
let MainICON1;
let ButtonICON1;
let BluetoothICON;
let BluetoothICON2;
let SoundNetText;
let RadarBackground;
let ConicGradient;
let RetryIcon;
let Welcome;
let Enflag;
let Esflag;
let ENESflag;
let Acept1;
let Settings;

let inputSSID
let inputPassword
let inputName
let inputCorreo1
let inputCorreo2
let inputCorreo3
let inputCorreo4
let inputCorreo5
let inputCorreo6
let inputTittle
let inputMenssaje
let umbralVoz

let Terms = 'Esta página web es propiedad y está operado por SoundNet. Estos Términos establecen los términos y condiciones bajo los cuales puedes usar nuestra página web y nuestros servicios. Esta página web ofrece a los visitantes la posibilidad de configurar los diferentes dispositivos de la marca SoundNet así como su conexión a internet, contraseñas para operar, configuración de correos electrónicos... Al acceder o usar la página web, aceptas haber leído, entendido y aceptado estar sujeto a estos Términos: INFORMACIÓN RELEVANTE En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña. El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para el uso de alguno de nuestros servicios. SoundNet no asume la responsabilidad en caso de que entregue dicha clave a terceros. En algunos casos puede que se requiera una verificación por medio de correo electrónico. LICENCIA SoudNet a través de su sitio web concede una licencia para que los usuarios utilicen los servicios que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento.';

let Terms2 = 'This website is owned and operated by SoundNet. These Terms set forth the terms and conditions under which you may use our website and services. This website offers visitors the ability to configure various SoundNet brand devices as well as their internet connection, passwords for operation, email settings… By accessing or using the website, you acknowledge that you have read, understood, and agree to be bound by these Terms: RELEVANT INFORMATION In some cases, to purchase a product, it will be necessary for the user to register, with the entry of reliable personal data and the definition of a password. The user can choose and change the key for their account administration access at any time, in case they have registered and it is necessary for the use of any of our services. SoundNet assumes no responsibility in the event that it delivers such a key to third parties. In some cases, verification by email may be required. LICENSE SoundNet, through its website, grants a license for users to use the services that are sold on this website in accordance with the Terms and Conditions described in this document.';

let MainFont;

let VideoBluetooth;

let Orientation = 0;

let HALFPI = 1.57079632;

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

let WelcomeHeight = -HALFPI;

let Wheel = 0;

let Trans = 0;

let ResetBLE = false;

let conexionBLE = false;

let AceptTerms = false;

let languaje = "EN";

let FloatFlag = 0;

let CapturaIMG;

let SubirAcept = -HALFPI;

let ConectarESP32 = false;

let PaginaBLE = false; //Set in false when finish programing

let TransparenciaBLE = 0;

let TransparenciaConfig = 255;

const serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const txCharacteristic = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"; // transmit is from the phone's perspective
const rxCharacteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";  // receive is from the phone's perspective

let myCharacteristic;
let myTxCharacteristic;
let myBLE;
let receiveText;


function connectAndStartNotify() {
    myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (characteristics.length > 0) {
    
    //console.log("Conectado correctamente a dispositivo SoundNet");
    
    PaginaBLE = true;
    
      for(let i = 0; i < characteristics.length; i++){
   if(rxCharacteristic ==characteristics[i].uuid){
    myCharacteristic = characteristics[i];
    myBLE.startNotifications(myCharacteristic, handleNotifications,'string');
   }else if (txCharacteristic ==characteristics[i].uuid){
     myTxCharacteristic = characteristics[i];
   } 
  }
    
  }
  if (error) console.log('error: ', error);
  
  
 
  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
  //myBLE.startNotifications(myCharacteristic, handleNotifications);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.startNotifications(myCharacteristic, handleNotifications, 'string');
}

// A function that will be called once got characteristics
function handleNotifications(data) {
  let receiveText = document.getElementById("receiveText");
  receiveText.value += data;
  receiveText.scrollTop = receiveText.scrollHeight;
  if (data === "\n"){
    handleLineBreak(receiveText.value);
    receiveText.value = "";
  }
}
function write(value){
  myBLE.write(myTxCharacteristic, value);
}
function writeValues(inputValue){
    let encoder = new TextEncoder('utf-8');
    let bufferToSend = encoder.encode(inputValue);
    myTxCharacteristic.writeValue(bufferToSend);
}

// A function to stop notifications
function stopNotifications() {
  myBLE.stopNotifications(myCharacteristic);
}

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
  ModelVIEW = loadImage("Assets/ModelVIEW.png");
  MainICON1 = loadImage("Assets/MainLOGO.png");
  ButtonICON1 = loadImage("Assets/Button1small.png");
  VideoBluetooth = createVideo("Assets/Bluetooth background2.mp4");
  BluetoothICON = loadImage("Assets/BluetoothICON.png");
  BluetoothICON2 = loadImage("Assets/BluetoothICON2.png");
  SoundNetText = loadImage("Assets/SoundnetTextlogosmall2.png");
  RadarBackground = loadImage("Assets/RadarBackground.png");
  ConicGradient = loadImage("Assets/ConicGradient.png");
  RetryIcon = loadImage("Assets/RetryIcon.png");
  Welcome = loadImage("Assets/WELCOME.png");
  Enflag = loadImage("Assets/ENflagsmall.png");
  Esflag = loadImage("Assets/ESflagsmall.png");
  ENESflag = loadImage("Assets/ENESsmall.png");
  Acept = loadImage("Assets/Acept.png");
  Settings = loadImage("Assets/Settings.png");
  
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  frameRate(60);
  
  VideoBluetooth.hide();
  
  background(50);
  
  determineOrientation();
  
  for(let i = 0;i<(width+height)*0.08;i++){
    particles.push(new Particle());
  }
  
  imageMode(CENTER);
  
  textFont(MainFont);
  
  textAlign(CENTER, CENTER);
  
  myBLE = new p5ble();
  
}

function draw() {
  
  if (PaginaBLE == true) {
    
  if (TransparenciaBLE == 0) {
    
  if (Orientation == 0) {
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(height*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.09);

    if (languaje == "ES") {

    text("Conectado correctamente", width/2, height/2);

    } else if (languaje == "EN") {

    text("Connected correctly", width/2, height/2);

    }
    
  } else {
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(width*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.09);

    if (languaje == "ES") {

    text("Conectado correctamente", width/2, height/2);

    } else if (languaje == "EN") {

    text("Connected correctly", width/2, height/2);

    }
    
  }
    
  }
    
    if (TransparenciaBLE < 50) {
      
    if (TransparenciaBLE >= 10) { 
    
    fill(80, 80, 80, TransparenciaBLE - 10);
    
    noStroke();
      
    rect(0, 0, width, height);
      
    }
    
    if (TransparenciaBLE < 265) {
    
    TransparenciaBLE = TransparenciaBLE + 10/frameRate();
      
    }
    
  } else {
    
   background(80);
    
    imageMode(CORNER);
    
   if (Orientation == 0) {
     
    image(Settings, height*0.02, height*0.02, Settings.width*height*0.0003, Settings.height*height*0.0003);
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.06);

    if (languaje == "ES") {

    text("Configura tu Wi-Fi", width/2, height*0.2);

    } else if (languaje == "EN") {

    text("Set your Wi-Fi", width/2, height*0.2);

    }
     
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.04);

    if (languaje == "ES") {

    text("SSID (Nombre de tu red Wi-Fi)", width/2, height*0.2);

    } else if (languaje == "EN") {

    text("SSID (Name of your Wi-Fi network)", width/2, height*0.2);

    }
    
  } else {
    
    image(Settings, width*0.02, width*0.02, Settings.width*width*0.0003, Settings.height*width*0.0003);
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06);

    if (languaje == "ES") {

    text("Configura tu Wi-Fi", width/2, height*0.2);

    } else if (languaje == "EN") {

    text("Set your Wi-Fi", width/2, height*0.2);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("SSID (Nombre de tu red Wi-Fi)", width/2, height*0.3);

    } else if (languaje == "EN") {

    text("SSID (Name of your Wi-Fi network)", width/2, height*0.3);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Contraseña", width/2, height*0.5);

    } else if (languaje == "EN") {

    text("Password", width/2, height*0.5);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06);

    if (languaje == "ES") {

    text("Configura tu dispositivo", width/2, height*0.7);

    } else if (languaje == "EN") {

    text("Set your device", width/2, height*0.7);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Nombre del dispositivo", width/2, height*0.8);

    } else if (languaje == "EN") {

    text("Name of the device", width/2, height*0.8);

    }
    
  }
    
    if (TransparenciaConfig > 0) {
      
    TransparenciaConfig = TransparenciaConfig - 80/frameRate();
      
    fill(80, 80, 80, TransparenciaConfig);
    
    noStroke();
      
    rect(0, 0, width, height);
      
    }
    
  }
      
  } else {
  
  cursor(ARROW);
  
  if (mouseIsPressedANT == true && mouseIsPressed == false) {
    
    mouseIsReleased = true;
    
  } else {
    
    mouseIsReleased = false;
    
  }
  
  mouseIsPressedANT = mouseIsPressed;
  
  if (AceptTerms == false) {
  
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
  
    if (Orientation == 0) {
      
    image(ENESflag, width/2 + height*0.35, height/2 - height*0.22, height*0.17, height*0.15);
      
    image(SoundNetText, width/2, height*0.12, height*0.8, height*0.15);
      
    push();
      
    if (mouseX >= width/2 - height*0.4/2 && mouseX <= width/2 + height*0.4/2 && mouseY >= height*0.9 - height*0.16/2 && mouseY <= height*0.9 + height*0.16/2 && StartPage == false) {
      
      cursor(HAND);
       
      if (mouseIsPressed == true) {
       
        tint(200, 200, 200);
        
      }
      
      if (mouseIsReleased == true) {
        
        StartPage = true;
        
      }
      
    }
      
    image(ButtonICON1, width/2, height*0.9, height*0.4, height*0.16);
      
    pop();
      
    image(MainICON1, width/2, height/2, height/2 + map(sin(increaseCircleSize), -1, 1, 0, height*2), height/2 + map(sin(increaseCircleSize), -1, 1, 0, height*2));
      
    if (dist(mouseX, mouseY, width/2, height/2) < height/2/2 && StartPage == false) {
      
      cursor(HAND);
      
      if (mouseIsPressed == true) {
      
        StartPage = true;
      
      }
      
    }
      
    image(ModelVIEW, width/2, height/2 + (sin(frameCount/30)*height*0.012),map(sin(increaseCircleSize), -1, 1, height*0.3, 0), map(sin(increaseCircleSize), -1, 1, height*0.15, 0));
  
  } else {
    
    image(ENESflag, width/2 + width*0.35, height/2 - width*0.22, width*0.17, width*0.15);
    
    image(SoundNetText, width/2, height*0.12, width*0.8, width*0.15);
    
    push();
    
      if (mouseX >= width/2 - height*0.4/2 && mouseX <= width/2 + height*0.4/2 && mouseY >= height*0.9 - height*0.16/2 && mouseY <= height*0.9 + height*0.16/2 && StartPage == false) {
        
      cursor(HAND);
        
      if (mouseIsPressed == true) {
       
        tint(200, 200, 200);
        
      }
        
      if (mouseIsReleased == true) {
        
        StartPage = true;
        
      }
      
    }
    
    image(ButtonICON1, width/2, height*0.9, height*0.4, height*0.16);
    
    pop();
    
    image(MainICON1, width/2, height/2, width/2 + map(sin(increaseCircleSize), -1, 1, 0, width*2), width/2 + map(sin(increaseCircleSize), -1, 1, 0, width*2));
    
    if (dist(mouseX, mouseY, width/2, height/2) < width/2/2 && StartPage == false) {
      
      cursor(HAND);
      
      if (mouseIsPressed == true) {
      
      StartPage = true;
        
      }
      
    }
    
    image(ModelVIEW, width/2, height/2 + (sin(frameCount/30)*width*0.012),map(sin(increaseCircleSize), -1, 1, width*0.3, 0), map(sin(increaseCircleSize), -1, 1, width*0.15, 0));
    
  }
  
  fill(50, 50, 50, map(sin(increaseCircleSize), -1, 1, 0, 255));
  noStroke();
  rect(0, 0, width, height);
  
    if (StartPage == true) {
      
      if (sin(increaseCircleSize) >= 0.9) {
        
        if (WelcomeHeight < HALFPI) {
          
          WelcomeHeight = WelcomeHeight + 1.5/frameRate();
          
          Wheel = 0;
          
        } else {
          
          if (Trans < 255) {
          
          Trans = Trans + 2;
            
          }
          
          if (Trans < 255) {

            Wheel = 0;

          }
          
        }
        
        if (Wheel >= height*2.6-width) {
          
          Wheel = height*2.6-width;
          
        }
        
       if (Wheel <= 0) {
          
          Wheel = 0;
          
        }
        
          noStroke();
          fill(255);
        
        FloatFlag = FloatFlag + 1.5/frameRate();
        
        if (Orientation == 0) {
      
          image(Welcome, width/2, map(sin(WelcomeHeight), -1, 1, height*1.1, height*0.2), height*0.7, height*0.4);
          
          if (WelcomeHeight >= HALFPI) {
            
            fill(255, 255, 255, Trans);
            
              for (let i = 0; i <= height*0.2; i++) {
              let inter = map(i, 0, height*0.2, 0, 1);
              let c = lerpColor(color(50, 50, 50, 255), color(50, 50, 50, 0), inter);
              stroke(c);
              line(0, height*0.55 - Wheel/3 - i, width, height*0.55 - Wheel/3 - i);
              push();
              fill(50, 50, 50);
              noStroke();
              rectMode(CORNER);
              rect(0, height*0.55 - Wheel/3, width, height*2);
              pop();
            }
            
            textAlign(LEFT, TOP);
            
            textSize(height*0.024);
            
            if (languaje == "ES") {
            
            text(Terms, width*0.3, height*0.55 - Wheel/3, width*0.6, height*2);
              
            } else if (languaje == "EN") {
              
            text(Terms2, width*0.3, height*0.55 - Wheel/3, width*0.6, height*2);
              
            }
            
            textAlign(CENTER, TOP);          

            textSize(height*0.045);
            
            if (languaje == "ES") {

            text("Porfavor lea los terminos y condiciones antes de continuar:", width*0.1, height*0.4 - Wheel/3, width*0.8, height);
              
            } else if (languaje == "EN") {
              
            text("Please read the terms and conditions before continue:", width*0.1, height*0.4 - Wheel/3, width*0.8, height);
              
            }
            
            push();
            
            if (AceptTerms == false) {
            
              tint(255);
              
            } else {
              
              tint(255);
              
            }
            
            if (mouseX >= width*0.2 - height*0.2 / 2 && mouseX <= width*0.2 + height*0.2 / 2 && mouseY >= height*0.6 - height*0.2 / 2 && mouseY <= height*0.6 + height*0.2 / 2) {
            
              cursor(HAND);
              
              tint(180, 255, 180);
              
              if (mouseIsPressed) {
                
              tint(130, 200, 130);
                
             conexionBLE = true;
                
              }
              
             if (mouseIsReleased == true) {
               
                CapturaIMG = get(0, 0, width, height);
                
                AceptTerms = true;
                
              }
            
            }
            
            image(Acept, width*0.15, height*0.6, height*0.2, height*0.2);
            
            pop();
            
          }
          
          if (languaje == "ES") {
            
            image(Esflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01), height*0.16, height*0.13);
            
          } else if (languaje == "EN") {
          
            image(Enflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01), height*0.16, height*0.13);
            
          }
          
          if (mouseX >= width*0.16 - height*0.16 / 2 && mouseX <= width*0.16 + height*0.16 / 2 && mouseY >= map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01) - height*0.13 / 2 && mouseY <= map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01) + height*0.13 / 2) {
              
            cursor(HAND);
            
            push();
            
            tint(255, 255, 255, 127);
            
            if (languaje == "ES") {
            
              image(Enflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01), height*0.16, height*0.13);
              
            } else if (languaje == "EN") {
              
              image(Esflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -height*0.01, height*0.01), height*0.16, height*0.13); 
              
            }
            
            pop();
            
            if (mouseIsReleased == true) {
              
              if (languaje == "ES") {
                
                languaje = "EN";
                
              } else if (languaje == "EN") {
                
                languaje = "ES";
                
              }
              
            }
              
          }
          
        } else {
          
          image(Welcome, width/2, map(sin(WelcomeHeight), -1, 1, height*1.1, width*0.2), width*0.7, width*0.4);
          
          if (WelcomeHeight >= HALFPI) {
            
            fill(255, 255, 255, Trans);
            
            for (let i = 0; i <= height*0.2; i++) {
              let inter = map(i, 0, height*0.2, 0, 1);
              let c = lerpColor(color(50, 50, 50, 255), color(50, 50, 50, 0), inter);
              stroke(c);
              line(0, height*0.55 - Wheel/3 - i, width, height*0.55 - Wheel/3 - i);
              push();
              fill(50, 50, 50);
              noStroke();
              rectMode(CORNER);
              rect(0, height*0.55 - Wheel/3, width, height*2);
              pop();
            }

            textAlign(CENTER, TOP);

            textSize(width*0.045);
            
            if (languaje == "ES") {

            text("Porfavor lea los terminos y condiciones antes de continuar:", width*0.1, width*0.4 - Wheel/3, width*0.8, height);
            
            } else if (languaje == "EN") {
              
            text("Please read the terms and conditions before continue:", width*0.1, width*0.4 - Wheel/3, width*0.8, height);
              
            }
            
            textAlign(LEFT, TOP);
            
            textSize(height*0.024);
            
            if (languaje == "ES") {
            
              text(Terms, width*0.3, width*0.55 - Wheel/3, width*0.6, height*2);
              
            } else if (languaje == "EN") {
              
              text(Terms2, width*0.3, width*0.55 - Wheel/3, width*0.6, height*2);
              
            }
            
            push();
            
            if (AceptTerms == false) {
            
              tint(255);
              
            } else {
              
              tint(255);
              
            }
            
            if (mouseX >= width*0.2 - width*0.2 / 2 && mouseX <= width*0.2 + width*0.2 / 2 && mouseY >= height*0.6 - width*0.2 / 2 && mouseY <= height*0.6 + width*0.2 / 2) {
            
              cursor(HAND);
              
              tint(180, 255, 180);
              
              if (mouseIsPressed) {
                
              tint(130, 200, 130);
                
              conexionBLE = true;
                
              }
              
              if (mouseIsReleased == true) {
                
                CapturaIMG = get(0, 0, width, height);
                
                AceptTerms = true; 
                
              }
            
            }
            
            image(Acept, width*0.15, height*0.6, width*0.2, width*0.2);
            
            pop();

          }
          
          if (languaje == "ES") {
            
            image(Esflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01), width*0.16, width*0.13);
            
          } else if (languaje == "EN") {
          
            image(Enflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01), width*0.16, width*0.13);
            
          }
          
          if (mouseX >= width*0.16 - width*0.16 / 2 && mouseX <= width*0.16 + width*0.16 / 2 && mouseY >= map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01) - width*0.13 / 2 && mouseY <= map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01) + width*0.13 / 2) {
              
            cursor(HAND);
            
            push();
            
            tint(255, 255, 255, 127);
            
            if (languaje == "ES") {
            
              image(Enflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01), width*0.16, width*0.13);
              
            } else if (languaje == "EN") {
              
              image(Esflag, width*0.16, map(sin(WelcomeHeight), -1, 1, -height*0.5, height*0.8) + map(sin(FloatFlag), -1, 1, -width*0.01, width*0.01), width*0.16, width*0.13); 
              
            }
            
            pop();
            
            if (mouseIsReleased == true) {
              
              if (languaje == "ES") {
                
                languaje = "EN";
                
              } else if (languaje == "EN") {
                
                languaje = "ES";
                
              }
              
            }
              
          }
          
        }
      
      }
      
    }
    
  } else { // Una vez se haya aceptado hacer el main code aqui:
    
  if (ConectarESP32 == false) {
    
  background(50);
    
  imageMode(CORNER);
    
    if (SubirAcept < HALFPI) {
          
      SubirAcept = SubirAcept + 1.5/frameRate();
          
    } else {
      
      ConectarESP32 = true;
      
      VideoBluetooth.play();
      
      imageMode(CENTER);
  
      textFont(MainFont);
  
      textAlign(CENTER, CENTER);
      
    }
    
  image(CapturaIMG, 0, map(sin(SubirAcept), -1, 1, 0, -height), width, height);    
    
  }
    
  }
  
      if (ConectarESP32 == true) {
      
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
        
        push();
        
        if (VideoBluetooth.time() >= 4 && VideoBluetooth.time() <= 22) {
          
          if (VideoBluetooth.time() <= 6) {
              
            fill(map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255));
          
          } else if (VideoBluetooth.time() >= 20) {
              
            fill(map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0));
          
          } else {
          
            fill(255);
            
          }
        
          noStroke();
        
          textSize(height*0.04);
          
          if (languaje == "ES") {
        
          text("Esto podría llevar unos segundos", width/2, height*0.6);
          text("porfavor espera y asegurate de", width/2, height*0.65);
          text("que el dispositivo este conectado", width/2, height*0.7);
            
          } else if (languaje == "EN") {
            
          text("This may take several seconds", width/2, height*0.6);
          text("plese wait and be sure the", width/2, height*0.65);
          text("device is correctly conected", width/2, height*0.7); 
            
          }
        
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
        
        if (VideoBluetooth.time() >= 4 && VideoBluetooth.time() <= 22) {
        
          if (VideoBluetooth.time() <= 6) {
              
            fill(map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255), map(VideoBluetooth.time(), 4, 6, 0, 255));
          
          } else if (VideoBluetooth.time() >= 20) {
              
            fill(map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0), map(VideoBluetooth.time(), 20, 22, 255, 0));
          
          } else {
          
            fill(255);
            
          }
        
          noStroke();
        
          textSize(width*0.04);
        
          if (languaje == "ES") {
        
          text("Esto podría llevar unos segundos", width/2, height*0.6);
          text("porfavor espera y asegurate de", width/2, height*0.65);
          text("que el dispositivo este conectado", width/2, height*0.7);
            
          } else if (languaje == "EN") {
            
          text("This may take several seconds", width/2, height*0.6);
          text("plese wait and be sure the", width/2, height*0.65);
          text("device is correctly conected", width/2, height*0.7); 
            
          }
        
        }
        
        image(BluetoothICON, width/2, height*0.3, map(sin(TintVideo), -1, 1, width*0.3, 0), map(sin(TintVideo), -1, 1, width*0.3, 0));
        
        
      }
        
      pop();
      
      fill(255);

        
      if (Orientation == 0) {
      
        image(BluetoothICON2, width/2, height*0.3, map(sin(TintVideo), 1, -1, height*0.3, 0), map(sin(TintVideo), 1, -1, height*0.3, 0));
        
        push();
        
        translate(width/2, height*0.7);
        
        rotate(map(sin(TintVideo), 1, -1, TWO_PI, 0));
        
        image(RetryIcon, 0, 0, map(sin(TintVideo), 1, -1, height*0.2, 0), map(sin(TintVideo), 1, -1, height*0.2, 0));
        
        pop();
        
        textSize(map(sin(TintVideo), 1, -1, height*0.04, 0));
        
        if (languaje == "ES") {
        
          text("No se ha encontrado ningún dispositivo", width/2, height/2);
          
        } else if (languaje == "EN") {
          
          text("Sorry no bluetooth devices found", width/2, height/2);
          
        }
        
        if (sin(TintVideo) >= 0.9 && dist(width/2, height*0.7, mouseX, mouseY) <= height*0.15) {
           
          cursor(HAND);
          
          if (mouseIsPressed == true) {
            
          retryConection = true;
          
          ConectarESP32 = true;
          
          VideoBluetooth.stop();
      
          VideoBluetooth.play();
          
          TintVideo = -1.57;

        //  increaseCircleSize = -1.57;
            
            ResetBLE = true;
          
          }
            
        }
        
        if (languaje == "ES") {
        
          text("Reintentar", width/2, height*0.8);
          
        } else if (languaje == "EN") {
        
          text("Retry", width/2, height*0.8);
          
        }
        
      } else {
        
        image(BluetoothICON2, width/2, height*0.3, map(sin(TintVideo), 1, -1, width*0.3, 0), map(sin(TintVideo), 1, -1, width*0.3, 0));
        
        push();
        
        translate(width/2, height*0.7);
        
        rotate(map(sin(TintVideo), 1, -1, TWO_PI, 0));
        
        image(RetryIcon, 0, 0, map(sin(TintVideo), 1, -1, width*0.2, 0), map(sin(TintVideo), 1, -1, width*0.2, 0));
        
        pop();
        
        textSize(map(sin(TintVideo), 1, -1, width*0.04, 0));
        
        if (languaje == "ES") {
        
          text("No se ha encontrado ningún dispositivo", width/2, height/2);
          
        } else if (languaje == "EN") {
          
          text("Sorry no bluetooth devices found", width/2, height/2);
          
        }
        
        if (sin(TintVideo) >= 0.9 && dist(width/2, height*0.7, mouseX, mouseY) <= height*0.15) {
           
          cursor(HAND);
          
          if (mouseIsPressed == true) {
            
          retryConection = true;
          
          ConectarESP32 = true;
          
          VideoBluetooth.stop();
      
          VideoBluetooth.play();
          
          TintVideo = -1.57;

        //  increaseCircleSize = -1.57;
            
          ResetBLE = true;
          
          }
            
        }
        
        if (languaje == "ES") {
        
          text("Reintentar", width/2, height*0.8);
          
        } else if (languaje == "EN") {
        
          text("Retry", width/2, height*0.8);
          
        }
        
      }
    
  
    }
  
}
  
}

function mouseWheel(event) {
  
  Wheel = Wheel + event.delta;
  
  //print(Wheel);
  
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

function mouseDragged() {

Wheel = Wheel + (pmouseY - mouseY)*3;
  
}

function mouseReleased() {
  
  if (Orientation == 0) {
  
  if (mouseX >= width*0.2 - height*0.2 / 2 && mouseX <= width*0.2 + height*0.2 / 2 && mouseY >= height*0.6 - height*0.2 / 2 && mouseY <= height*0.6 + height*0.2 / 2) {
  
  if (conexionBLE == true) {
 
    connectAndStartNotify();
    
    conexionBLE = false;
  
  }
    
  }
    
  } else {
              
  if (mouseX >= width*0.2 - width*0.2 / 2 && mouseX <= width*0.2 + width*0.2 / 2 && mouseY >= height*0.6 - width*0.2 / 2 && mouseY <= height*0.6 + width*0.2 / 2) {
    
  if (conexionBLE == true) {
 
    connectAndStartNotify();
    
    conexionBLE = false;
  
  }
    
  }
    
  }
  
  if (ResetBLE == true) {
      
  connectAndStartNotify();
    
    ResetBLE = false;
      
  }
  
}
