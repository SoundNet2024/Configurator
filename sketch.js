
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
let IconoCorreo;
let Microphone;
let Speaker;
let ErrorIco;
let AceptarEN;
let AceptarES;
let Cross;
let TickFinal;


let backgroundImage;


let inputSSID;
let inputPassword;
let inputName;
let inputCorreo1;
let inputCorreo2;
let inputCorreo3;
let inputCorreo4;
let inputCorreo5;
let inputCorreo6;
let inputTittle;
let inputMenssaje;
let umbralVoz;

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

let Time1 = false;

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

let numCorreos = 0;

let CorreoValido1 = 0;

let CorreoValido2 = 0;

let CorreoValido3 = 0;

let CorreoValido4 = 0;

let CorreoValido5 = 0;

let CorreoValido6 = 0;

let borderRadius = 20; // int
let fontSize = 24; // int
let shadowBlur = 15; // int

let speed = 0;

let speed2 = 0;

let speed3 = 0;

let r = 255, g = 0, b = 0;

let state = 0

let PaginaBLE = false; //Set in false when finish programing

let TransparenciaBLE = 0;

let TransparenciaConfig = 255;

let trasparenciaFinal = 0;

let trasparenciaFinal2 = 255;

let growFinal = 0;

let growFinalTimer = 0;

let volumen = 0;

let volumenANT = 0;

let alto = 0.0058;

let EnvioDatos = false; //Set in false when finish programing

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
  receiveText = receiveText + data;
  if (data === "\n"){
    
    volumenANT = volumen;
    
    volumen = int(receiveText);
    
    if (volumen >= 999) {
      
      volumen = 999;
        
    }
    
    if (volumen <= 0) {
      
      volumen = 0; 
        
    }
    
    console.log(volumen);
    receiveText = "";
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
  IconoCorreo = loadImage("Assets/IconoCorreo.png");
  Microphone = loadImage("Assets/Microphone.png");
  Speaker = loadImage("Assets/Speaker.png");
  ErrorIco = loadImage("Assets/Error.png");
  AceptarEN = loadImage("Assets/AceptarEN.png");
  AceptarES = loadImage("Assets/AceptarES.png");
  Cross = loadImage("Assets/Cross.png");
  TickFinal = loadImage("Assets/TickFinal.png");
  VideoBluetooth = createVideo("Assets/Bluetooth background2.mp4");
  
}

let Phone = false;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  frameRate(60);
  
  /*
  
  if (esDispositivoMovil()) {
    
    Phone = true;

  } else {
    
    Phone = false;
    
  }
  
  */
  
  VideoBluetooth.hide();
  
  background(50);
  
  backgroundImage = get(0, 0, 1, 1);
  
  determineOrientation();
  
  if (Phone == false) {
  
  for(let i = 0;i<(width+height)*0.08;i++){
    particles.push(new Particle());
  }
    
  }
  
  imageMode(CENTER);
  
  textFont(MainFont);
  
  textAlign(CENTER, CENTER);
  
  myBLE = new p5ble();
  
}

function draw() {
  
  alto = 0.0058 * 919/windowHeight;
  
  cursor(ARROW);
  
  if (mouseIsPressedANT == true && mouseIsPressed == false) {
    
    mouseIsReleased = true;
    
  } else {
    
    mouseIsReleased = false;
    
  }
  
  mouseIsPressedANT = mouseIsPressed;
  
  if (EnvioDatos == true) {
    
  image(backgroundImage, 0, 0, windowWidth, windowHeight);
    
  fill(80, 80, 80, trasparenciaFinal);
    
  noStroke();
    
  rect(0, 0, width, height);
    
  if (trasparenciaFinal < 255) {
    
    trasparenciaFinal = trasparenciaFinal + 100/frameRate();
      
  } else {
    
  imageMode(CENTER);
    
  if (Orientation == 0) {
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(height*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.06);

    if (languaje == "ES") {

    text("Dispositivo listo", width/2, windowHeight*0.75);

    } else if (languaje == "EN") {

    text("Device ready", width/2, windowHeight*0.75);

    }
    
    fill(234, 255, 150);
    
    stroke(0);
    
    strokeWeight(height*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.04);

    if (languaje == "ES") {

    text("Comprueba que el dispositivo se conecte a la red", width/2, windowHeight*0.85);

    } else if (languaje == "EN") {

    text("Check that the device connects to the network", width/2, windowHeight*0.85);

    }
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(height*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.06);

    if (languaje == "ES") {

    text("Datos enviados correctamente", width/2, windowHeight*0.22);

    } else if (languaje == "EN") {

    text("Data sent correctly", width/2, windowHeight*0.22);

    }
    
    image(ModelVIEW, width/2, height/2, ModelVIEW.width*height*0.001, ModelVIEW.height*height*0.001);
    
    if (growFinal > 0) {
    
    image(TickFinal, width/2, height/2,  map(growFinal, 0, 100, 0, TickFinal.width*height*0.0006), map(growFinal, 0, 100, 0, TickFinal.height*height*0.0006));
      
    }
    
  } else {
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(width*0.008);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06);

    if (languaje == "ES") {

    text("Dispositivo listo", width/2, windowHeight*0.75);

    } else if (languaje == "EN") {

    text("Device ready", width/2, windowHeight*0.75);

    }
    
    fill(234, 255, 150);
    
    stroke(0);
    
    strokeWeight(width*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Comprueba que el dispositivo se conecte a la red", width/2, windowHeight*0.85);

    } else if (languaje == "EN") {

    text("Check that the device connects to the network", width/2, windowHeight*0.85);

    }
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(width*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06);

    if (languaje == "ES") {

    text("Datos enviados correctamente", width/2, windowHeight*0.22);

    } else if (languaje == "EN") {

    text("Data sent correctly", width/2, windowHeight*0.22);

    }
    
    image(ModelVIEW, width/2, height/2, ModelVIEW.width*width*0.001, ModelVIEW.height*width*0.001);
    
    if (growFinal > 0) {
    
    image(TickFinal, width/2, height/2,  map(growFinal, 0, 100, 0, TickFinal.width*width*0.0006),  map(growFinal, 0, 100, 0, TickFinal.height*width*0.0006));
      
    }
    
  }
    
  fill(80, 80, 80, trasparenciaFinal2);
    
  noStroke();
    
  rect(0, 0, width, height);
    
  if (trasparenciaFinal2 > 0) {
    
    trasparenciaFinal2 = trasparenciaFinal2 - 100/frameRate();
      
  } else {
    
    if (growFinalTimer >= 1500) {
    
    location.reload();
      
    } else {
      
    if (growFinalTimer <= 100) {
    
      growFinal = growFinalTimer;
        
    }
      
    growFinalTimer = growFinalTimer + 100/frameRate();
      
    }
    
  }
    
  }
    
  } else {
  
  if (PaginaBLE == true) {
    
  cursor(ARROW);
    
  if (TransparenciaBLE == 0) {
    
  if (Orientation == 0) {
    
    fill(84, 240, 144);
    
    stroke(0);
    
    strokeWeight(height*0.01);
    
    textAlign(CENTER, CENTER);          

    textSize(height*0.075);

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

    textSize(width*0.075);

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
    
    if (Time1 == false) {
      
      Time1 = true;
    
        inputSSID = createInput();

    // Agrega un detector de eventos para la tecla Enter
    inputSSID.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputSSID.elt.blur();
      }
    });
    
    inputPassword = createInput();
    
    // Agrega un detector de eventos para la tecla Enter
    inputPassword.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputPassword.elt.blur();
      }
    });
    
    inputName = createInput();
    
    inputName.value('SoundNet-001');
    
    // Agrega un detector de eventos para la tecla Enter
    inputName.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputName.elt.blur();
      }
    });
    
    inputCorreo1 = createInput();
    
    inputCorreo1.value(' Email 1');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo1.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo1.elt.blur();
      }
    });
    
    inputCorreo2 = createInput();
    
    inputCorreo2.value(' Email 2');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo2.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo2.elt.blur();
      }
    });
    
    inputCorreo3 = createInput();
    
    inputCorreo3.value(' Email 3');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo3.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo3.elt.blur();
      }
    });
    
    inputCorreo4 = createInput();
    
    inputCorreo4.value(' Email 4');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo4.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo4.elt.blur();
      }
    });
    
    inputCorreo5 = createInput();
    
    inputCorreo5.value(' Email 5');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo5.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo5.elt.blur();
      }
    });
    
    inputCorreo6 = createInput();
    
    inputCorreo6.value(' Email 6');
    
    // Agrega un detector de eventos para la tecla Enter
    inputCorreo6.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputCorreo6.elt.blur();
      }
    });
    
    inputTittle = createInput();
    
    // Agrega un detector de eventos para la tecla Enter
    inputTittle.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputTittle.elt.blur();
      }
    });
    
    inputMenssaje = createElement('textarea');
    
    // Agrega un detector de eventos para la tecla Enter
    inputMenssaje.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        inputMenssaje.elt.blur();
      }
    });
      
    if (languaje == "ES") {

    inputTittle.value(' Título');
      
    } else if (languaje == "EN") {

    inputTittle.value(' Title');

    }
    
    if (languaje == "ES") {

    inputMenssaje.value(' Máximo 300 caracteres');
      
    } else if (languaje == "EN") {

    inputMenssaje.value(' Maximum 300 characters');

    }
    
    umbralVoz = createInput();
      
    umbralVoz.attribute('type', 'number');
      
    umbralVoz.input(limitLength);
      
    umbralVoz.style('text-align', 'center');
      
    umbralVoz.value(500);
    
    // Agrega un detector de eventos para la tecla Enter
    umbralVoz.elt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Quita el foco del cuadro de texto
        umbralVoz.elt.blur();
      }
    });
    
  }
    
    imageMode(CORNER);
    
    FloatFlag = FloatFlag + 1.5/frameRate();
    
   if (Orientation == 0) {
     
     resizeCanvas(windowWidth, windowHeight*windowHeight*alto);
     
     background(80);
     
    image(Settings, height/(windowHeight*alto)*0.02, height/(windowHeight*alto)*0.02, Settings.width*height/(windowHeight*alto)*0.0003, Settings.height*height/(windowHeight*alto)*0.0003);
     
    if (languaje == "ES") {
            
            image(Esflag, width - height/(windowHeight*alto)*0.2, height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009), Esflag.width*height/(windowHeight*alto)*0.0007, Esflag.height*height/(windowHeight*alto)*0.0007);
            
          } else if (languaje == "EN") {
          
            image(Enflag, width - height/(windowHeight*alto)*0.2, height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009), Enflag.width*height/(windowHeight*alto)*0.0007, Enflag.height*height/(windowHeight*alto)*0.0007);
            
          }
          
          if (mouseX >= width - height/(windowHeight*alto)*0.2 && mouseX <= width - height/(windowHeight*alto)*0.2 + Enflag.width*height/(windowHeight*alto)*0.0007 && mouseY >= height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009) && mouseY <= height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009) + Enflag.height*height/(windowHeight*alto)*0.0007) {
              
            cursor(HAND);
            
            push();
            
            if (Phone == false) {
            
            tint(255, 255, 255, 127);
              
            }
            
            if (languaje == "ES") {
            
              image(Enflag, width - height/(windowHeight*alto)*0.2, height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009), Esflag.width*height/(windowHeight*alto)*0.0007, Esflag.height*height/(windowHeight*alto)*0.0007);
              
            } else if (languaje == "EN") {
              
              image(Esflag, width - height/(windowHeight*alto)*0.2, height/(windowHeight*alto)*0.03 + map(sin(FloatFlag), -1, 1, -height/(windowHeight*alto)*0.009, height/(windowHeight*alto)*0.009), Esflag.width*height/(windowHeight*alto)*0.0007, Esflag.height*height/(windowHeight*alto)*0.0007);
              
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
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.06)

    if (languaje == "ES") {

    text("Configura tu Wi-Fi", width/2, windowHeight*0.2);

    } else if (languaje == "EN") {

    text("Set your Wi-Fi", width/2, windowHeight*0.2);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {

    text("SSID (Nombre de tu red Wi-Fi)", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.09);

    } else if (languaje == "EN") {

    text("SSID (Name of your Wi-Fi network)", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.09);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {

    text("Contraseña", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.09 + height/(windowHeight*alto)*0.3);

    } else if (languaje == "EN") {

    text("Password", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.09 + height/(windowHeight*alto)*0.3);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.06);

    if (languaje == "ES") {

    text("Configura tu dispositivo", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.8);

    } else if (languaje == "EN") {

    text("Set your device", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.8);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {

    text("Nombre del dispositivo", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.6 + height/(windowHeight*alto)*0.3);

    } else if (languaje == "EN") {

    text("Name of the device", width/2, windowHeight*0.2 + height/(windowHeight*alto)*0.6 + height/(windowHeight*alto)*0.3);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {

    text("Añade hasta 6 correos electronicos (mín 1)", width/2, windowHeight*0.2 + height/(windowHeight*alto)*1.2);

    } else if (languaje == "EN") {

    text("Add up to 6 electronic mails (at least 1)", width/2, windowHeight*0.2 + height/(windowHeight*alto)*1.2);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {
      
    if (numCorreos == 1) {

    text("Hay solo" + numCorreos + " correo configurado", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
      
    } else if (numCorreos > 1) {
               
    text("Hay " + numCorreos + " correos configurado", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
               
    } else {
      
    text("No hay correos configurados", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
      
    }

    } else if (languaje == "EN") {
      
    if (numCorreos == 1) {

    text("There is only " + numCorreos + " email configured", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
      
    } else if (numCorreos > 1) {
               
    text("There are " + numCorreos + " emails configured", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
               
    } else {
      
    text("There are no emails configured", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.25);
      
    }

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(height/(windowHeight*alto)*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(height/(windowHeight*alto)*0.04);

    if (languaje == "ES") {
      
    if (numCorreos >= 1) {

    text("Asegurate de que lo hayas escrito bien", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.35);
      
    } else {
      
    text("Introduce por lo menos 1 correo correcto", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.35);
      
    }

    } else if (languaje == "EN") {

    if (numCorreos >= 1) {

    text("Make sure you have written correctly", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.35);
      
    } else {
      
    text("Enter at least 1 correct email", width/2, windowHeight*0.2 + height/(windowHeight*alto)*2.35);
      
    }

    }
     
    fill(223, 209, 255);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.05);

    if (languaje == "ES") {

    text("0 <> 999", (width/2 - windowHeight*0.5) + windowHeight*0.25, windowHeight*0.2 + windowHeight*4.28);

    } else if (languaje == "EN") {

    text("0 <> 999", (width/2 - windowHeight*0.5) + windowHeight*0.25, windowHeight*0.2 + windowHeight*4.28);

    }
    
    image(IconoCorreo, width/2 + height/(windowHeight*alto)*0.25, windowHeight*0.2 + height/(windowHeight*alto)*2.5, IconoCorreo.width* height/(windowHeight*alto)*0.0003, IconoCorreo.height*height/(windowHeight*alto)*0.0003);
     
     push();
     
  if (Phone == false) {
  
  tint(r, g, b);
    
  }
  
    switch(state) {
    case 0:
      g++;
      if(g == 255) state = 1;
      break;
    case 1:
      r--;
      if(r == 0) state = 2;
      break;
    case 2:
      b++;
      if(b == 255) state = 3;
      break;
    case 3:
      g--;
      if(g == 0) state = 4;
      break;
    case 4:
      r++;
      if(r == 255) state = 5;
      break;
    case 5:
      b--;
      if(b == 0) state = 0;
      break;
  }
          
    image(Microphone, (width/2 - windowHeight*0.5) + windowHeight*0.12, windowHeight*0.2 + windowHeight*3.75, Microphone.width*windowHeight*0.0004, Microphone.height*windowHeight*0.0004);
     
    pop();

    if (numCorreos < 1 || inputSSID.value().length < 1 || inputSSID.value().startsWith(" ") || inputPassword.value().length < 1 || inputPassword.value().startsWith(" ") || inputName.value().length < 3  || inputName.value().startsWith(" ") || inputTittle.value().length < 1 || inputTittle.value().startsWith(" ") || inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
    if (inputSSID.value().length < 1 || inputSSID.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("Debe introducir un SSID correcto", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("You must enter a correct SSID", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
      
    } else if (inputPassword.value().length < 1 || inputPassword.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("Debe introducir la contraseña correcta", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("You must enter the correct password", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    } else if (inputName.value().length < 3  || inputName.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("El nombre del dispositivo debe tener al menos 3 letras", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("Device name must be at least 3 letters", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    } else if (numCorreos < 1) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("No hay correos validos", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("There are no valid emails", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    }  else if (inputTittle.value().length < 1 || inputTittle.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("No has introducido ningún título de correo", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("You have not entered any email title", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    } else if (inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("No hay ningún mensaje en el correo", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("There is no message in the email", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    } else {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(windowHeight*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(windowHeight*0.04);

    if (languaje == "ES") {

    text("¡Error desconocido!", width/2, windowHeight*0.2 + windowHeight*4.9);

    } else if (languaje == "EN") {

    text("Unknow error!", width/2, windowHeight*0.2 + windowHeight*4.9);

    }
               
    }
      
      if (mouseX >= width/2 - ErrorIco.width*windowHeight*0.00055/2 && mouseX <= width/2 - ErrorIco.width*windowHeight*0.00055/2 + ErrorIco.width*windowHeight*0.00055 && mouseY >= windowHeight*0.2 + windowHeight*4.55 && mouseY <= windowHeight*0.2 + windowHeight*4.55 + ErrorIco.height*windowHeight*0.00055) {
          
        cursor(CROSS);
          
      }
      
      image(ErrorIco, width/2 - ErrorIco.width*windowHeight*0.00055/2, windowHeight*0.2 + windowHeight*4.55, ErrorIco.width*windowHeight*0.00055, ErrorIco.height*windowHeight*0.00055);
        
    } else {
    
    if (languaje == "ES") {
    
      image(AceptarES, width/2 - AceptarES.width*windowHeight*0.00055/2, windowHeight*0.2 + windowHeight*4.55, AceptarES.width*windowHeight*0.00055, AceptarES.height*windowHeight*0.00055);
    
    } else if (languaje == "EN") {
      
      image(AceptarEN, width/2 - AceptarEN.width*windowHeight*0.00055/2, windowHeight*0.2 + windowHeight*4.55, AceptarEN.width*windowHeight*0.00055, AceptarEN.height*windowHeight*0.00055);
      
    }
      
      if (mouseX >= width/2 - AceptarES.width*windowHeight*0.00055/2 && mouseX <= width/2 - AceptarES.width*windowHeight*0.00055/2 + AceptarES.width*windowHeight*0.00055 && mouseY >= windowHeight*0.2 + windowHeight*4.55 && mouseY <= windowHeight*0.2 + windowHeight*4.55 + AceptarES.height*windowHeight*0.00055) {
          
        cursor(HAND);
        
      if (mouseIsPressed == true) {
        
        push();
        
        if (Phone == false) {
        
        tint(219, 255, 176);
          
        }
        
          if (languaje == "ES") {

            image(AceptarES, width/2 - AceptarES.width*windowHeight*0.00055/2, windowHeight*0.2 + windowHeight*4.55, AceptarES.width*windowHeight*0.00055, AceptarES.height*windowHeight*0.00055);

          } else if (languaje == "EN") {

            image(AceptarEN, width/2 - AceptarEN.width*windowHeight*0.00055/2, windowHeight*0.2 + windowHeight*4.55, AceptarEN.width*windowHeight*0.00055, AceptarEN.height*windowHeight*0.00055);

          }
        
        pop();
        
      }
          
      }
    
   }
    
    strokeWeight(windowHeight*0.01);
    
    fill(170);
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.5, windowHeight*0.2 + windowHeight*3.6, windowHeight*0.2, windowHeight*0.8, windowHeight*0.06);
     
     if (volumenANT > volumen) {
     
    volumenANT = volumenANT - ((volumenANT - volumen)/10)/frameRate()*60;
         
    } else if (volumenANT < volumen) {
     
    volumenANT = volumenANT + ((volumen - volumenANT)/10)/frameRate()*60;
         
    } else {
      
    volumenANT = volumen;
      
    }
    
    let volumenaltura = map(volumenANT, 0, 999, windowHeight*0.1, windowHeight*0.62);
    
    fill(44, 232, 213);
    
    stroke(174, 74, 255);
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.5, windowHeight*0.2 + windowHeight*3.6 + (windowHeight*0.74 - volumenaltura), windowHeight*0.2, windowHeight*0.8 - (windowHeight*0.74 - volumenaltura), windowHeight*0.06);
    
    noStroke();
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.5, windowHeight*0.2 + windowHeight*3.6 + (windowHeight*0.74 - volumenaltura), windowHeight*0.2, windowHeight*0.7 - (windowHeight*0.74 - volumenaltura));
    
    speed3 = speed3 + 0.04/frameRate()*60;
    
    drawSineWave((width/2 - windowHeight*0.5) + windowHeight*0.5 + windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.68 - volumenaltura, (width/2 - windowHeight*0.5) + windowHeight*0.7 - windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.74 - volumenaltura, 24 / windowHeight, speed3, 'rgb(227,186,248)');
    
    speed2 = speed2 + 0.03/frameRate()*60;
    
    drawSineWave((width/2 - windowHeight*0.5) + windowHeight*0.5 + windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.68 - volumenaltura, (width/2 - windowHeight*0.5) + windowHeight*0.7 - windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.74 - volumenaltura, 24.5 / windowHeight, speed2, 'rgb(250,144,95)');
    
    speed = speed + 0.02/frameRate()*60;
    drawSineWave((width/2 - windowHeight*0.5) + windowHeight*0.5 + windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.68 - volumenaltura, (width/2 - windowHeight*0.5) + windowHeight*0.7 - windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.74 - volumenaltura, 25 / windowHeight, speed, 'rgb(44,232,213)');
    
    noFill();
    
    stroke(174, 74, 255);
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.5, windowHeight*0.2 + windowHeight*3.6, windowHeight*0.2, windowHeight*0.8, windowHeight*0.06);
    
    noStroke();
    
    fill(80);
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.7 + windowHeight*0.01/2, windowHeight*0.2 + windowHeight*3.6, windowHeight*0.2, windowHeight*0.8);
    
    let barra = map(umbralVoz.value(), 999, 0, 0, windowHeight*0.6);
    
    noStroke();
    
    if (volumen >= umbralVoz.value()) {
    
    fill(255, 224, 23);
    
    } else {
      
    fill(166, 255, 128);

    }
    
    rect((width/2 - windowHeight*0.5) + windowHeight*0.48, windowHeight*0.2 + windowHeight*3.67 + barra, windowHeight*0.24, windowHeight*0.015, windowHeight*0.01);
    
    push();
    
    if (volumen >= umbralVoz.value()) {
      
    if (Phone == false) {
    
    tint(255, 224, 23);
      
    }
    
    } else {
      
    if (Phone == false) {
      
    tint(166, 255, 128);
      
    }

    }
    
    image(Speaker, (width/2 - windowHeight*0.5) + windowHeight*0.75,  windowHeight*0.2 + windowHeight*3.64 + barra, Speaker.width*windowHeight*0.000145, Speaker.height*windowHeight*0.000145);
    
    if (mouseX >= (width/2 - windowHeight*0.5) + windowHeight*0.48 && mouseX <= (width/2 - windowHeight*0.5) + windowHeight*0.75 + Speaker.width*windowHeight*0.000145 && mouseY >= windowHeight*0.2 + windowHeight*3.64 + barra && mouseY <= windowHeight*0.2 + windowHeight*3.64 + barra + Speaker.height*windowHeight*0.000145) {
        
    cursor(HAND);
        
    }
    
    if (mouseX >= (width/2 - windowHeight*0.5) + windowHeight*0.4 && mouseX <= (width/2 - windowHeight*0.5) + windowHeight*0.75 + Speaker.width*windowHeight*0.000145 && mouseY >= windowHeight*0.2 + windowHeight*3.64 + Speaker.height*windowHeight*0.000145/2 && mouseY <= windowHeight*0.2 + windowHeight*3.64 + windowHeight*0.6 + Speaker.height*windowHeight*0.000145/2 && mouseIsPressed == true) {
      
    umbralVoz.value(round(map(mouseY, windowHeight*0.2 + windowHeight*3.64 + Speaker.height*windowHeight*0.000145/2, windowHeight*0.2 + windowHeight*3.64 + windowHeight*0.6 + Speaker.height*windowHeight*0.000145/2,  999, 0)));
      
    }
    
    if (mouseX >= (width/2 - windowHeight*0.5) + windowHeight*0.4 && mouseX <= (width/2 - windowHeight*0.5) + windowHeight*0.75 + Speaker.width*windowHeight*0.000145 && mouseY >= windowHeight*0.2 + windowHeight*3.6 && mouseY <= windowHeight*0.2 + windowHeight*3.6 + windowHeight*0.8 && mouseIsPressed == true) {
      
      if (mouseY <= windowHeight*0.2 + windowHeight*3.64 + Speaker.height*windowHeight*0.000145/2) {
      
    umbralVoz.value(999);
      
      }
      
      if (mouseY >= windowHeight*0.2 + windowHeight*3.64 + windowHeight*0.6 + Speaker.height*windowHeight*0.000145/2) {
      
    umbralVoz.value(0);
      
      }
      
    }
    
    pop();
    
    inputSSID.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*0.17);
    inputSSID.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputSSID.attribute('maxlength', '128');
    inputSSID.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputSSID.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputSSID.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputSSID.style('font-family', 'Verdana');
    inputSSID.style('color', 'rgb(0, 80, 160)'); // Cambia el color del texto a rojo
    
    inputPassword.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*0.46);
    inputPassword.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputPassword.attribute('maxlength', '128');
    inputPassword.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputPassword.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputPassword.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputPassword.style('font-family', 'Verdana');
    inputPassword.style('color', 'rgb(0, 120, 60)'); // Cambia el color del texto a rojo
    
    inputName.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*0.98);
    inputName.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputName.attribute('maxlength', '128');
    inputName.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputName.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputName.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputName.style('font-family', 'Verdana');
    inputName.style('color', 'rgb(255, 255, 220)'); // Cambia el color del texto a rojo
    inputName.style('background-color', 'rgb(0, 170, 180)'); // Cambia el color de fondo a
    
    inputCorreo1.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*1.3);
    inputCorreo1.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo1.attribute('maxlength', '128');
    inputCorreo1.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo1.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo1.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo1.style('font-family', 'Verdana');
    inputCorreo1.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo1.value()) == true) {
      
    CorreoValido1 = 1;
    
    inputCorreo1.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido1 = 0;
      
    inputCorreo1.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo2.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*1.45);
    inputCorreo2.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo2.attribute('maxlength', '128');
    inputCorreo2.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo2.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo2.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo2.style('font-family', 'Verdana');
    inputCorreo2.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo2.value()) == true) {
      
    CorreoValido2 = 1;
    
    inputCorreo2.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido2 = 0;
      
    inputCorreo2.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo3.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*1.6);
    inputCorreo3.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo3.attribute('maxlength', '128');
    inputCorreo3.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo3.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo3.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo3.style('font-family', 'Verdana');
    inputCorreo3.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo3.value()) == true) {
      
    CorreoValido3 = 1;
    
    inputCorreo3.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido3 = 0;
      
    inputCorreo3.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo4.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*1.75);
    inputCorreo4.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo4.attribute('maxlength', '128');
    inputCorreo4.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo4.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo4.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo4.style('font-family', 'Verdana');
    inputCorreo4.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
        
    if (esCorreoValido(inputCorreo4.value()) == true) {
      
    CorreoValido4 = 1;
    
    inputCorreo4.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido4 = 0;
      
    inputCorreo4.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo5.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*1.9);
    inputCorreo5.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo5.attribute('maxlength', '128');
    inputCorreo5.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo5.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo5.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo5.style('font-family', 'Verdana');
    inputCorreo5.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo

    if (esCorreoValido(inputCorreo5.value()) == true) {
      
    CorreoValido5 = 1;
    
    inputCorreo5.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido5 = 0;
      
    inputCorreo5.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo6.position(width/2 - height/(windowHeight*alto)*0.8 /2, windowHeight*0.2 + height/(windowHeight*alto)*2.05);
    inputCorreo6.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.1);
    inputCorreo6.attribute('maxlength', '128');
    inputCorreo6.style('border-radius', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo6.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputCorreo6.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo6.style('font-family', 'Verdana');
    inputCorreo6.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo6.value()) == true) {
      
    CorreoValido6 = 1;
    
    inputCorreo6.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido6 = 0;
      
    inputCorreo6.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputTittle.position(width/2 - height/(windowHeight*alto)*0.8/2, windowHeight*0.2 + height/(windowHeight*alto)*2.52);
    inputTittle.size(height/(windowHeight*alto)*0.6, height/(windowHeight*alto)*0.15);
    inputTittle.attribute('maxlength', '128');
    inputTittle.style('border-radius', height/(windowHeight*alto)*0.02 + 'px');
    inputTittle.style('font-size', height/(windowHeight*alto)*0.06 + 'px');
    inputTittle.style('font-weight', 'bold');
    inputTittle.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.01 + 'px rgba(0, 0, 0, 1)');
    inputTittle.style('font-family', 'Verdana');
    inputTittle.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    inputTittle.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    inputMenssaje.position(width/2 - height/(windowHeight*alto)*0.8/2, windowHeight*0.2 + height/(windowHeight*alto)*2.72);
    inputMenssaje.size(height/(windowHeight*alto)*0.8, height/(windowHeight*alto)*0.8);
    inputMenssaje.attribute('maxlength', '300');
    inputMenssaje.style('border-radius', height/(windowHeight*alto)*0.02 + 'px');
    inputMenssaje.style('font-size', height/(windowHeight*alto)*0.04 + 'px');
    inputMenssaje.style('box-shadow', '0 0 ' + height/(windowHeight*alto)*0.01 + 'px rgba(0, 0, 0, 1)');
    inputMenssaje.style('font-family', 'Calibri');
     
    umbralVoz.position((width/2 - windowHeight*0.5) + windowHeight*0.09, windowHeight*0.2 + windowHeight*4.1);
    umbralVoz.size(windowHeight*0.3, windowHeight*0.1);
    umbralVoz.attribute('maxlength', '128');
    umbralVoz.style('border-radius', windowHeight*0.02 + 'px');
    umbralVoz.style('font-size', windowHeight*0.06 + 'px');
    umbralVoz.style('font-weight', 'bold');
    umbralVoz.style('box-shadow', '0 0 ' + windowHeight*0.01 + 'px rgba(0, 0, 0, 1)');
    umbralVoz.style('font-family', 'Verdana');
    umbralVoz.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    umbralVoz.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    if (umbralVoz.value().charAt(0) === '0' && umbralVoz.value().length > 1) {
      
    if (umbralVoz.value() === '01') {
        
    umbralVoz.value(1);
        
    } else if (umbralVoz.value() === '02') {
        
    umbralVoz.value(2);  
      
    } else if (umbralVoz.value() === '03') {
        
    umbralVoz.value(3);
        
    } else if (umbralVoz.value() === '04') {
        
    umbralVoz.value(4);
        
    } else if (umbralVoz.value() === '05') {
        
    umbralVoz.value(5);
        
    } else if (umbralVoz.value() === '06') {
      
    umbralVoz.value(6);  
        
    } else if (umbralVoz.value() === '07') {
      
    umbralVoz.value(7);    
        
    } else if (umbralVoz.value() === '08') {
      
    umbralVoz.value(8);  
        
    } else if (umbralVoz.value() === '09') {
      
    umbralVoz.value(9);  
        
    } else {
      
      umbralVoz.value(0);
      
    }
    
    }
     
    if (umbralVoz.value() <= 0) {
    umbralVoz.value(0);
    }
    
    if (umbralVoz.value() >= 999) {
    umbralVoz.value(999);
    }
     
    if (inputTittle.value() === ' Título') {
    
      inputTittle.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
      
  } else if (inputTittle.value() === ' Title') {
    
    inputTittle.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
    
  } else {

    inputTittle.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    
  }
    
    if (inputMenssaje.value() === ' Máximo 300 caracteres') {
    
      inputMenssaje.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
      
  } else if (inputMenssaje.value() === ' Maximum 300 characters') {
    
    inputMenssaje.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
    
  } else {

    inputMenssaje.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    
  }
    inputMenssaje.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    numCorreos = CorreoValido1 + CorreoValido2 + CorreoValido3 + CorreoValido4 + CorreoValido5 + CorreoValido6;
    
    inputCorreo1.mousePressed(function() {
  if (inputCorreo1.value() === ' Email 1') {
    inputCorreo1.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo2.mousePressed(function() {
  if (inputCorreo2.value() === ' Email 2') {
    inputCorreo2.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo3.mousePressed(function() {
  if (inputCorreo3.value() === ' Email 3') {
    inputCorreo3.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo4.mousePressed(function() {
  if (inputCorreo4.value() === ' Email 4') {
    inputCorreo4.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo5.mousePressed(function() {
  if (inputCorreo5.value() === ' Email 5') {
    inputCorreo5.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo6.mousePressed(function() {
  if (inputCorreo6.value() === ' Email 6') {
    inputCorreo6.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputMenssaje.mousePressed(function() {
    if (inputMenssaje.value() === ' Maximum 300 characters' || inputMenssaje.value() === ' Máximo 300 caracteres') {
    inputMenssaje.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
     
    inputTittle.mousePressed(function() {
    if (inputTittle.value() === ' Título' || inputTittle.value() === ' Title') {
    inputTittle.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
  } else {
    
    resizeCanvas(windowWidth, windowHeight*windowWidth*alto);
    
    background(80);
    
    image(Settings, width*0.02, width*0.02, Settings.width*width*0.0003, Settings.height*width*0.0003);
    
        if (languaje == "ES") {
            
            image(Esflag, width - width*0.2, width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009), Esflag.width*width*0.0007, Esflag.height*width*0.0007);
            
          } else if (languaje == "EN") {
          
            image(Enflag, width - width*0.2, width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009), Enflag.width*width*0.0007, Enflag.height*width*0.0007);
            
          }
          
          if (mouseX >= width - width*0.2 && mouseX <= width - width*0.2 + Esflag.width*width*0.0007 && mouseY >= width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009) && mouseY <= width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009) + Esflag.height*width*0.0007) {
              
            cursor(HAND);
            
            push();
            
            if (Phone == false) {
            
            tint(255, 255, 255, 127);
              
            }
            
            if (languaje == "ES") {
            
              image(Enflag, width - width*0.2, width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009), Esflag.width*width*0.0007, Esflag.height*width*0.0007);
              
            } else if (languaje == "EN") {
              
              image(Esflag, width - width*0.2, width*0.03 + map(sin(FloatFlag), -1, 1, -width*0.009, width*0.009), Esflag.width*width*0.0007, Esflag.height*width*0.0007);
              
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
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06)

    if (languaje == "ES") {

    text("Configura tu Wi-Fi", width/2, windowWidth*0.2);

    } else if (languaje == "EN") {

    text("Set your Wi-Fi", width/2, windowWidth*0.2);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("SSID (Nombre de tu red Wi-Fi)", width/2, windowWidth*0.2 + width*0.09);

    } else if (languaje == "EN") {

    text("SSID (Name of your Wi-Fi network)", width/2, windowWidth*0.2 + width*0.09);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Contraseña", width/2, windowWidth*0.2 + width*0.09 + width*0.3);

    } else if (languaje == "EN") {

    text("Password", width/2, windowWidth*0.2 + width*0.09 + width*0.3);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.006);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.06);

    if (languaje == "ES") {

    text("Configura tu dispositivo", width/2, windowWidth*0.2 + width*0.8);

    } else if (languaje == "EN") {

    text("Set your device", width/2, windowWidth*0.2 + width*0.8);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Nombre del dispositivo", width/2, windowWidth*0.2 + width*0.6 + width*0.3);

    } else if (languaje == "EN") {

    text("Name of the device", width/2, windowWidth*0.2 + width*0.6 + width*0.3);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Añade hasta 6 correos electronicos (mín 1)", width/2, windowWidth*0.2 + width*1.2);

    } else if (languaje == "EN") {

    text("Add up to 6 electronic mails (at least 1)", width/2, windowWidth*0.2 + width*1.2);

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {
      
    if (numCorreos == 1) {

    text("Hay solo" + numCorreos + " correo configurado", width/2, windowWidth*0.2 + width*2.25);
      
    } else if (numCorreos > 1) {
               
    text("Hay " + numCorreos + " correos configurado", width/2, windowWidth*0.2 + width*2.25);
               
    } else {
      
    text("No hay correos configurados", width/2, windowWidth*0.2 + width*2.25);
      
    }

    } else if (languaje == "EN") {
      
    if (numCorreos == 1) {

    text("There is only " + numCorreos + " email configured", width/2, windowWidth*0.2 + width*2.25);
      
    } else if (numCorreos > 1) {
               
    text("There are " + numCorreos + " emails configured", width/2, windowWidth*0.2 + width*2.25);
               
    } else {
      
    text("There are no emails configured", width/2, windowWidth*0.2 + width*2.25);
      
    }

    }
    
    fill(250, 250, 250);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {
      
    if (numCorreos >= 1) {

    text("Asegurate de que lo hayas escrito bien", width/2, windowWidth*0.2 + width*2.35);
      
    } else {
      
    text("Introduce por lo menos 1 correo correcto", width/2, windowWidth*0.2 + width*2.35);
      
    }

    } else if (languaje == "EN") {

    if (numCorreos >= 1) {

    text("Make sure you have written correctly", width/2, windowWidth*0.2 + width*2.35);
      
    } else {
      
    text("Enter at least 1 correct email", width/2, windowWidth*0.2 + width*2.35);
      
    }

    }
    
    fill(223, 209, 255);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.05);

    if (languaje == "ES") {

    text("0 <> 999", width*0.25, windowWidth*0.2 + width*4.28);

    } else if (languaje == "EN") {

    text("0 <> 999", width*0.25, windowWidth*0.2 + width*4.28);

    }
    
    image(IconoCorreo, width*0.75, windowWidth*0.2 + width*2.5, IconoCorreo.width* width*0.0003, IconoCorreo.height*width*0.0003)
    
    push();
    
  if (Phone == false) {
  
  tint(r, g, b);
    
  }
  
    switch(state) {
    case 0:
      g++;
      if(g == 255) state = 1;
      break;
    case 1:
      r--;
      if(r == 0) state = 2;
      break;
    case 2:
      b++;
      if(b == 255) state = 3;
      break;
    case 3:
      g--;
      if(g == 0) state = 4;
      break;
    case 4:
      r++;
      if(r == 255) state = 5;
      break;
    case 5:
      b--;
      if(b == 0) state = 0;
      break;
  }
          
    image(Microphone, width*0.12, windowWidth*0.2 + width*3.75, Microphone.width*width*0.0004, Microphone.height*width*0.0004);
     
    pop();

    if (numCorreos < 1 || inputSSID.value().length < 1 || inputSSID.value().startsWith(" ") || inputPassword.value().length < 1 || inputPassword.value().startsWith(" ") || inputName.value().length < 3  || inputName.value().startsWith(" ") || inputTittle.value().length < 1 || inputTittle.value().startsWith(" ") || inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
    if (inputSSID.value().length < 1 || inputSSID.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Debe introducir un SSID correcto", width/2, windowWidth*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("You must enter a correct SSID", width/2, windowWidth*0.2 + width*4.9);

    }
      
    } else if (inputPassword.value().length < 1 || inputPassword.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("Debe introducir la contraseña correcta", width/2, windowWidth*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("You must enter the correct password", width/2, windowWidth*0.2 + width*4.9);

    }
               
    } else if (inputName.value().length < 3  || inputName.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("El nombre del dispositivo debe tener al menos 3 letras", width/2, windowWidth*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("Device name must be at least 3 letters", width/2, windowWidth*0.2 + width*4.9);

    }
               
    } else if (numCorreos < 1) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("No hay correos validos", width/2, windowWidth*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("There are no valid emails", width/2, windowWidth*0.2 + width*4.9);

    }
               
    }  else if (inputTittle.value().length < 1 || inputTittle.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("No has introducido ningún título de correo", width/2, windowWidth*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("You have not entered any email title", width/2, windowWidth*0.2 + width*4.9);

    }
               
    } else if (inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("No hay ningún mensaje en el correo", width/2, width*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("There is no message in the email", width/2, width*0.2 + width*4.9);

    }
               
    } else {
      
    fill(255, 250, 207);
    
    stroke(0);
    
    strokeWeight(width*0.004);
    
    textAlign(CENTER, CENTER);          

    textSize(width*0.04);

    if (languaje == "ES") {

    text("¡Error desconocido!", width/2, width*0.2 + width*4.9);

    } else if (languaje == "EN") {

    text("Unknow error!", width/2, width*0.2 + width*4.9);

    }
               
    }
      
      if (mouseX >= width/2 - ErrorIco.width*width*0.00055/2 && mouseX <= width/2 - ErrorIco.width*width*0.00055/2 + ErrorIco.width*width*0.00055 && mouseY >= windowWidth*0.2 + width*4.55 && mouseY <= windowWidth*0.2 + width*4.55 + ErrorIco.height*width*0.00055) {
          
        cursor(CROSS);
          
      }
      
      image(ErrorIco, width/2 - ErrorIco.width*width*0.00055/2, windowWidth*0.2 + width*4.55, ErrorIco.width*width*0.00055, ErrorIco.height*width*0.00055);
        
    } else {
    
    if (languaje == "ES") {
    
      image(AceptarES, width/2 - AceptarES.width*width*0.00055/2, windowWidth*0.2 + width*4.55, AceptarES.width*width*0.00055, AceptarES.height*width*0.00055);
    
    } else if (languaje == "EN") {
      
      image(AceptarEN, width/2 - AceptarEN.width*width*0.00055/2, windowWidth*0.2 + width*4.55, AceptarEN.width*width*0.00055, AceptarEN.height*width*0.00055);
      
    }
      
      if (mouseX >= width/2 - AceptarES.width*width*0.00055/2 && mouseX <= width/2 - AceptarES.width*width*0.00055/2 + AceptarES.width*width*0.00055 && mouseY >= windowWidth*0.2 + width*4.55 && mouseY <= windowWidth*0.2 + width*4.55 + AceptarES.height*width*0.00055) {
          
        cursor(HAND);
        
      if (mouseIsPressed == true) {
        
        push();
        
        if (Phone == false) {
        
        tint(219, 255, 176);
          
        }
        
          if (languaje == "ES") {

            image(AceptarES, width/2 - AceptarES.width*width*0.00055/2, windowWidth*0.2 + width*4.55, AceptarES.width*width*0.00055, AceptarES.height*width*0.00055);

          } else if (languaje == "EN") {

            image(AceptarEN, width/2 - AceptarEN.width*width*0.00055/2, windowWidth*0.2 + width*4.55, AceptarEN.width*width*0.00055, AceptarEN.height*width*0.00055);

          }
        
        pop();
        
      }
          
      }
    
   }
    
    strokeWeight(width*0.01);
    
    fill(170);
    
    rect(width*0.5, windowWidth*0.2 + width*3.6, width*0.2, width*0.8, width*0.06);
    
    if (volumen > 0) {
      
      volumen = volumen - 1;
      
    }
    
    let volumenaltura = map(volumen, 0, 999, width*0.1, width*0.62);
    
    fill(44, 232, 213);
    
    stroke(174, 74, 255);
    
    rect(width*0.5, windowWidth*0.2 + width*3.6 + (width*0.74 - volumenaltura), width*0.2, width*0.8 - (width*0.74 - volumenaltura), width*0.06);
    
    noStroke();
    
    rect(width*0.5, windowWidth*0.2 + width*3.6 + (width*0.74 - volumenaltura), width*0.2, width*0.7 - (width*0.74 - volumenaltura));
    
    speed3 = speed3 + 0.04/frameRate()*60;
    
    drawSineWave(width*0.5 + width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.68 - volumenaltura, width*0.7 - width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.74 - volumenaltura, 24 / windowWidth, speed3, 'rgb(227,186,248)');
    
    speed2 = speed2 + 0.03/frameRate()*60;
    
    drawSineWave(width*0.5 + width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.68 - volumenaltura, width*0.7 - width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.74 - volumenaltura, 24.5 / windowWidth, speed2, 'rgb(250,144,95)');
    
    speed = speed + 0.02/frameRate()*60;
    drawSineWave(width*0.5 + width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.68 - volumenaltura, width*0.7 - width*0.01/2, windowWidth*0.2 + width*3.6 + width*0.74 - volumenaltura, 25 / windowWidth, speed, 'rgb(44,232,213)');
    
    noFill();
    
    stroke(174, 74, 255);
    
    rect(width*0.5, windowWidth*0.2 + width*3.6, width*0.2, width*0.8, width*0.06);
    
    noStroke();
    
    fill(80);
    
    rect(width*0.7 + width*0.01/2, windowWidth*0.2 + width*3.6, width*0.2, width*0.8);
    
    let barra = map(umbralVoz.value(), 999, 0, 0, width*0.6);
    
    noStroke();
    
    if (volumen >= umbralVoz.value()) {
    
    fill(255, 224, 23);
    
    } else {
      
    fill(166, 255, 128);

    }
    
    rect(width*0.48, windowWidth*0.2 + width*3.67 + barra, width*0.24, width*0.015, width*0.01);
    
    push();
    
    if (volumen >= umbralVoz.value()) {
      
    if (Phone == false) {
    
    tint(255, 224, 23);
      
    }
    
    } else {
      
    if (Phone == false) {
      
    tint(166, 255, 128);
      
    }

    }
    
    image(Speaker, width*0.75,  windowWidth*0.2 + width*3.64 + barra, Speaker.width*width*0.000145, Speaker.height*width*0.000145);
    
    if (mouseX >= width*0.48 && mouseX <= width*0.75 + Speaker.width*width*0.000145 && mouseY >= windowWidth*0.2 + width*3.64 + barra && mouseY <= windowWidth*0.2 + width*3.64 + barra + Speaker.height*width*0.000145) {
        
    cursor(HAND);
        
    }
    
    if (mouseX >= width*0.4 && mouseX <= width*0.75 + Speaker.width*width*0.000145 && mouseY >= windowWidth*0.2 + width*3.64 + Speaker.height*width*0.000145/2 && mouseY <= windowWidth*0.2 + width*3.64 + width*0.6 + Speaker.height*width*0.000145/2 && mouseIsPressed == true) {
      
    umbralVoz.value(round(map(mouseY, windowWidth*0.2 + width*3.64 + Speaker.height*width*0.000145/2, windowWidth*0.2 + width*3.64 + width*0.6 + Speaker.height*width*0.000145/2,  999, 0)));
      
    }
    
    if (mouseX >= width*0.4 && mouseX <= width*0.75 + Speaker.width*width*0.000145 && mouseY >= windowWidth*0.2 + width*3.6 && mouseY <= windowWidth*0.2 + width*3.6 + width*0.8 && mouseIsPressed == true) {
      
      if (mouseY <= windowWidth*0.2 + width*3.64 + Speaker.height*width*0.000145/2) {
      
    umbralVoz.value(999);
      
      }
      
      if (mouseY >= windowWidth*0.2 + width*3.64 + width*0.6 + Speaker.height*width*0.000145/2) {
      
    umbralVoz.value(0);
      
      }
      
    }
    
    pop();
    
    inputSSID.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*0.17);
    inputSSID.size(width*0.8, width*0.1);
    inputSSID.attribute('maxlength', '128');
    inputSSID.style('border-radius', width*0.04 + 'px');
    inputSSID.style('font-size', width*0.04 + 'px');
    inputSSID.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputSSID.style('font-family', 'Verdana');
    inputSSID.style('color', 'rgb(0, 80, 160)'); // Cambia el color del texto a rojo
    
    inputPassword.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*0.46);
    inputPassword.size(width*0.8, width*0.1);
    inputPassword.attribute('maxlength', '128');
    inputPassword.style('border-radius', width*0.04 + 'px');
    inputPassword.style('font-size', width*0.04 + 'px');
    inputPassword.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputPassword.style('font-family', 'Verdana');
    inputPassword.style('color', 'rgb(0, 120, 60)'); // Cambia el color del texto a rojo
    
    inputName.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*0.98);
    inputName.size(width*0.8, width*0.1);
    inputName.attribute('maxlength', '128');
    inputName.style('border-radius', width*0.04 + 'px');
    inputName.style('font-size', width*0.04 + 'px');
    inputName.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputName.style('font-family', 'Verdana');
    inputName.style('color', 'rgb(255, 255, 220)'); // Cambia el color del texto a rojo
    inputName.style('background-color', 'rgb(0, 170, 180)'); // Cambia el color de fondo a
    
    inputCorreo1.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*1.3);
    inputCorreo1.size(width*0.8, width*0.1);
    inputCorreo1.attribute('maxlength', '128');
    inputCorreo1.style('border-radius', width*0.04 + 'px');
    inputCorreo1.style('font-size', width*0.04 + 'px');
    inputCorreo1.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo1.style('font-family', 'Verdana');
    inputCorreo1.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo1.value()) == true) {
      
    CorreoValido1 = 1;
    
    inputCorreo1.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido1 = 0;
      
    inputCorreo1.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo2.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*1.45);
    inputCorreo2.size(width*0.8, width*0.1);
    inputCorreo2.attribute('maxlength', '128');
    inputCorreo2.style('border-radius', width*0.04 + 'px');
    inputCorreo2.style('font-size', width*0.04 + 'px');
    inputCorreo2.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo2.style('font-family', 'Verdana');
    inputCorreo2.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo2.value()) == true) {
      
    CorreoValido2 = 1;
    
    inputCorreo2.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido2 = 0;
      
    inputCorreo2.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo3.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*1.6);
    inputCorreo3.size(width*0.8, width*0.1);
    inputCorreo3.attribute('maxlength', '128');
    inputCorreo3.style('border-radius', width*0.04 + 'px');
    inputCorreo3.style('font-size', width*0.04 + 'px');
    inputCorreo3.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo3.style('font-family', 'Verdana');
    inputCorreo3.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo3.value()) == true) {
      
    CorreoValido3 = 1;
    
    inputCorreo3.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido3 = 0;
      
    inputCorreo3.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo4.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*1.75);
    inputCorreo4.size(width*0.8, width*0.1);
    inputCorreo4.attribute('maxlength', '128');
    inputCorreo4.style('border-radius', width*0.04 + 'px');
    inputCorreo4.style('font-size', width*0.04 + 'px');
    inputCorreo4.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo4.style('font-family', 'Verdana');
    inputCorreo4.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
        
    if (esCorreoValido(inputCorreo4.value()) == true) {
      
    CorreoValido4 = 1;
    
    inputCorreo4.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido4 = 0;
      
    inputCorreo4.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo5.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*1.9);
    inputCorreo5.size(width*0.8, width*0.1);
    inputCorreo5.attribute('maxlength', '128');
    inputCorreo5.style('border-radius', width*0.04 + 'px');
    inputCorreo5.style('font-size', width*0.04 + 'px');
    inputCorreo5.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo5.style('font-family', 'Verdana');
    inputCorreo5.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo

    if (esCorreoValido(inputCorreo5.value()) == true) {
      
    CorreoValido5 = 1;
    
    inputCorreo5.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido5 = 0;
      
    inputCorreo5.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputCorreo6.position(width/2 - width*0.8 /2, windowWidth*0.2 + width*2.05);
    inputCorreo6.size(width*0.8, width*0.1);
    inputCorreo6.attribute('maxlength', '128');
    inputCorreo6.style('border-radius', width*0.04 + 'px');
    inputCorreo6.style('font-size', width*0.04 + 'px');
    inputCorreo6.style('box-shadow', '0 0 ' + width*0.03 + 'px rgba(0, 0, 0, 1)');
    inputCorreo6.style('font-family', 'Verdana');
    inputCorreo6.style('color', 'rgb(255, 230, 200)'); // Cambia el color del texto a rojo
    
    if (esCorreoValido(inputCorreo6.value()) == true) {
      
    CorreoValido6 = 1;
    
    inputCorreo6.style('background-color', 'rgb(0, 190, 100)'); // Cambia el color de fondo a
      
    } else {
      
    CorreoValido6 = 0;
      
    inputCorreo6.style('background-color', 'rgb(210, 70, 40)'); // Cambia el color de fondo a
      
    }
    
    inputTittle.position(width*0.1, windowWidth*0.2 + width*2.52);
    inputTittle.size(width*0.6, width*0.15);
    inputTittle.attribute('maxlength', '128');
    inputTittle.style('border-radius', width*0.02 + 'px');
    inputTittle.style('font-size', width*0.06 + 'px');
    inputTittle.style('font-weight', 'bold');
    inputTittle.style('box-shadow', '0 0 ' + width*0.01 + 'px rgba(0, 0, 0, 1)');
    inputTittle.style('font-family', 'Verdana');
    inputTittle.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    inputTittle.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    inputMenssaje.position(width*0.1, windowWidth*0.2 + width*2.72);
    inputMenssaje.size(width*0.8, width*0.8);
    inputMenssaje.attribute('maxlength', '300');
    inputMenssaje.style('border-radius', width*0.02 + 'px');
    inputMenssaje.style('font-size', width*0.04 + 'px');
    inputMenssaje.style('box-shadow', '0 0 ' + width*0.01 + 'px rgba(0, 0, 0, 1)');
    inputMenssaje.style('font-family', 'Calibri');
    
    umbralVoz.position(width*0.09, windowWidth*0.2 + width*4.1);
    umbralVoz.size(width*0.3, width*0.1);
    umbralVoz.attribute('maxlength', '128');
    umbralVoz.style('border-radius', width*0.02 + 'px');
    umbralVoz.style('font-size', width*0.06 + 'px');
    umbralVoz.style('font-weight', 'bold');
    umbralVoz.style('box-shadow', '0 0 ' + width*0.01 + 'px rgba(0, 0, 0, 1)');
    umbralVoz.style('font-family', 'Verdana');
    umbralVoz.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    umbralVoz.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    if (umbralVoz.value().charAt(0) === '0' && umbralVoz.value().length > 1) {
      
    if (umbralVoz.value() === '01') {
        
    umbralVoz.value(1);
        
    } else if (umbralVoz.value() === '02') {
        
    umbralVoz.value(2);  
      
    } else if (umbralVoz.value() === '03') {
        
    umbralVoz.value(3);
        
    } else if (umbralVoz.value() === '04') {
        
    umbralVoz.value(4);
        
    } else if (umbralVoz.value() === '05') {
        
    umbralVoz.value(5);
        
    } else if (umbralVoz.value() === '06') {
      
    umbralVoz.value(6);  
        
    } else if (umbralVoz.value() === '07') {
      
    umbralVoz.value(7);    
        
    } else if (umbralVoz.value() === '08') {
      
    umbralVoz.value(8);  
        
    } else if (umbralVoz.value() === '09') {
      
    umbralVoz.value(9);  
        
    } else {
      
      umbralVoz.value(0);
      
    }
    
    }
    
    if (umbralVoz.value() <= 0) {
    umbralVoz.value(0);
    }
    
    if (umbralVoz.value() >= 999) {
    umbralVoz.value(999);
    }
    
    if (inputTittle.value() === ' Título') {
    
      inputTittle.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
      
  } else if (inputTittle.value() === ' Title') {
    
    inputTittle.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
    
  } else {

    inputTittle.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    
  }
    
    if (inputMenssaje.value() === ' Máximo 300 caracteres') {
    
      inputMenssaje.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
      
  } else if (inputMenssaje.value() === ' Maximum 300 characters') {
    
    inputMenssaje.style('color', 'rgb(200, 130, 10)'); // Cambia el color del texto a rojo
    
  } else {

    inputMenssaje.style('color', 'rgb(10, 10, 10)'); // Cambia el color del texto a rojo
    
  }
    inputMenssaje.style('background-color', 'rgb(255, 255, 255)'); // Cambia el color de fondo a
    
    numCorreos = CorreoValido1 + CorreoValido2 + CorreoValido3 + CorreoValido4 + CorreoValido5 + CorreoValido6;
    
    inputCorreo1.mousePressed(function() {
  if (inputCorreo1.value() === ' Email 1') {
    inputCorreo1.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo2.mousePressed(function() {
  if (inputCorreo2.value() === ' Email 2') {
    inputCorreo2.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo3.mousePressed(function() {
  if (inputCorreo3.value() === ' Email 3') {
    inputCorreo3.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo4.mousePressed(function() {
  if (inputCorreo4.value() === ' Email 4') {
    inputCorreo4.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo5.mousePressed(function() {
  if (inputCorreo5.value() === ' Email 5') {
    inputCorreo5.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputCorreo6.mousePressed(function() {
  if (inputCorreo6.value() === ' Email 6') {
    inputCorreo6.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});

    inputMenssaje.mousePressed(function() {
    if (inputMenssaje.value() === ' Maximum 300 characters' || inputMenssaje.value() === ' Máximo 300 caracteres') {
    inputMenssaje.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});
    
    inputTittle.mousePressed(function() {
    if (inputTittle.value() === ' Título' || inputTittle.value() === ' Title') {
    inputTittle.value(''); // Elimina el texto 'Email 1' cuando se hace clic en el recuadro de texto
  }
});

    
  }
    
    if (TransparenciaConfig > 0) {
      
    TransparenciaConfig = TransparenciaConfig - 80/frameRate();
      
    fill(80, 80, 80, TransparenciaConfig);
    
    noStroke();
      
    rect(0, 0, width, height);
      
    }
    
  }
      
  } else {
  
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
        
        if (Phone == false) {
       
        tint(200, 200, 200);
          
        }
        
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
        
        if (Phone == false) {
       
        tint(200, 200, 200);
          
        }
        
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
              
              if (Phone == false) {
            
              tint(255);
                
              }
              
            } else {
              
              if (Phone == false) {
              
              tint(255);
                
              }
              
            }
            
            if (mouseX >= width*0.15 - height*0.2 / 2 && mouseX <= width*0.15 + height*0.2 / 2 && mouseY >= height*0.6 - height*0.2 / 2 && mouseY <= height*0.6 + height*0.2 / 2) {
            
              cursor(HAND);
              
              if (Phone == false) {
              
              tint(180, 255, 180);
                
              }
              
              if (mouseIsPressed) {
                
              if (Phone == false) {
                
              tint(130, 200, 130);
                
              }
                
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
            
            if (Phone == false) {
            
            tint(255, 255, 255, 127);
              
            }
            
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
              
              if (Phone == false) {
            
              tint(255);
                
              }
              
            } else {
              
              if (Phone == false) {
              
              tint(255);
                
              }
              
            }
            
            if (mouseX >= width*0.15 - width*0.2 / 2 && mouseX <= width*0.15 + width*0.2 / 2 && mouseY >= height*0.6 - width*0.2 / 2 && mouseY <= height*0.6 + width*0.2 / 2) {
            
              cursor(HAND);
              
              if (Phone == false) {
              
              tint(180, 255, 180);
                
              }
              
              if (mouseIsPressed) {
                
              if (Phone == false) {
                
              tint(130, 200, 130);
                
              }
                
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
            
            if (Phone == false) {
            
            tint(255, 255, 255, 127);
              
            }
            
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
        
      if (Phone == false) {
      
      tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 255) - map(sin(TintVideo), -1, 1, 0, 255));
      
      }
        
      if (retryConection == true) {
        
        if (VideoBluetooth.time() <= 2) {
          
          if (Phone == false) {
          
          tint(255, 255, 255, map(VideoBluetooth.time(), 0, 2, 0, 255));
            
          }
        
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
        
        if (Phone == false) {
        
        tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 100) - map(sin(TintVideo), -1, 1, 0, 100));
          
        }
        
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
        
        if (Phone == false) {
        
        tint(255, 255, 255, map(sin(increaseCircleSize), -1, 1, 0, 100) - map(sin(TintVideo), -1, 1, 0, 100));
        
        }
        
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
  
}

function mouseWheel(event) {
  
  Wheel = Wheel + event.delta;
  
  //print(Wheel);
  
}

function determineOrientation() {
  if (windowWidth > windowHeight) {
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
  
  if (Orientation == 0) {
  
  if (numCorreos < 1 || inputSSID.value().length < 1 || inputSSID.value().startsWith(" ") || inputPassword.value().length < 1 || inputPassword.value().startsWith(" ") || inputName.value().length < 3  || inputName.value().startsWith(" ") || inputTittle.value().length < 1 || inputTittle.value().startsWith(" ") || inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
      } else {
  
  if (mouseX >= width/2 - AceptarES.width*windowHeight*0.00055/2 && mouseX <= width/2 - AceptarES.width*windowHeight*0.00055/2 + AceptarES.width*windowHeight*0.00055 && mouseY >= windowHeight*0.2 + windowHeight*4.55 && mouseY <= windowHeight*0.2 + windowHeight*4.55 + AceptarES.height*windowHeight*0.00055) {
    
    //Here send datato esp32 ANF
    
    if (esCorreoValido(inputCorreo1.value()) == false) {
       
       inputCorreo1.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo2.value()) == false) {
       
       inputCorreo2.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo3.value()) == false) {
       
       inputCorreo3.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo4.value()) == false) {
       
       inputCorreo4.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo5.value()) == false) {
       
       inputCorreo5.value("XXX");
       
     }
    
     if (esCorreoValido(inputCorreo6.value()) == false) {
       
       inputCorreo6.value("XXX");
       
     }
    
    writeValues(inputSSID.value() + '|' + inputPassword.value() + '|' + inputName.value() + '|' + inputCorreo1.value() + '|' + inputCorreo2.value() + '|' + inputCorreo3.value() + '|' + inputCorreo4.value() + '|' + inputCorreo5.value() + '|' + inputCorreo6.value() + '|' + inputTittle.value() + '|' + inputMenssaje.value() + '|' + umbralVoz.value() + '|' + "\n");
    
    EnvioDatos = true;
    
    backgroundImage = get(0, windowHeight*windowWidth*alto - windowHeight, windowWidth, windowHeight);
    
    inputSSID.remove();
    inputPassword.remove();
    inputName.remove();
    inputCorreo1.remove();
    inputCorreo2.remove();
    inputCorreo3.remove();
    inputCorreo4.remove();
    inputCorreo5.remove();
    inputCorreo6.remove();
    inputTittle.remove();
    inputMenssaje.remove();
    umbralVoz.remove();
    
    resizeCanvas(windowWidth, windowHeight);
        
    cursor(ARROW);
    
  }
  
}
  
} else {
  
if (numCorreos < 1 || inputSSID.value().length < 1 || inputSSID.value().startsWith(" ") || inputPassword.value().length < 1 || inputPassword.value().startsWith(" ") || inputName.value().length < 3  || inputName.value().startsWith(" ") || inputTittle.value().length < 1 || inputTittle.value().startsWith(" ") || inputMenssaje.value().length < 1 || inputMenssaje.value().startsWith(" ")) {
      
      } else {
  
  if (mouseX >= width/2 - AceptarES.width*width*0.00055/2 && mouseX <= width/2 - AceptarES.width*width*0.00055/2 + AceptarES.width*width*0.00055 && mouseY >= windowWidth*0.2 + width*4.55 && mouseY <= windowWidth*0.2 + width*4.55 + AceptarES.height*width*0.00055) {
    
    //Here send datato esp32 ANF
    
    if (esCorreoValido(inputCorreo1.value()) == false) {
       
       inputCorreo1.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo2.value()) == false) {
       
       inputCorreo2.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo3.value()) == false) {
       
       inputCorreo3.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo4.value()) == false) {
       
       inputCorreo4.value("XXX");
       
     }
    
    if (esCorreoValido(inputCorreo5.value()) == false) {
       
       inputCorreo5.value("XXX");
       
     }
    
     if (esCorreoValido(inputCorreo6.value()) == false) {
       
       inputCorreo6.value("XXX");
       
     }
    
    writeValues(inputSSID.value() + '|' + inputPassword.value() + '|' + inputName.value() + '|' + inputCorreo1.value() + '|' + inputCorreo2.value() + '|' + inputCorreo3.value() + '|' + inputCorreo4.value() + '|' + inputCorreo5.value() + '|' + inputCorreo6.value() + '|' + inputTittle.value() + '|' + inputMenssaje.value() + '|' + umbralVoz.value() + '|' + "\n");
    
    EnvioDatos = true;
    
    backgroundImage = get(0, windowHeight*windowWidth*alto - windowHeight, windowWidth, windowHeight);
    
    inputSSID.remove();
    inputPassword.remove();
    inputName.remove();
    inputCorreo1.remove();
    inputCorreo2.remove();
    inputCorreo3.remove();
    inputCorreo4.remove();
    inputCorreo5.remove();
    inputCorreo6.remove();
    inputTittle.remove();
    inputMenssaje.remove();
    umbralVoz.remove();
    
    resizeCanvas(windowWidth, windowHeight);
        
    cursor(ARROW);
    
  }
  
}
  
}
  
}

function esCorreoValido(correo) {
  var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(correo);
}

function drawSineWave(xMin, yMin, xMax, yMax, period, fase, color) {
  fill(color);
  stroke(color);
  beginShape();
  for(let x = xMin; x <= xMax; x++) {
    let y = map(sin(x * period + fase), -1, 1, yMin, yMax);
    vertex(x, y);
  }
  vertex(xMax, yMax);
  vertex(xMin, yMax);
  endShape(CLOSE);
}

function limitLength() {
  if (umbralVoz.value().length > 3) {
    umbralVoz.value(umbralVoz.value().slice(0, 3));
  }
}

function esDispositivoMovil() {
  return typeof window.orientation !== "undefined";
}
