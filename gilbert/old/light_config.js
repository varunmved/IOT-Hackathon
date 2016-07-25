
var mraa = require('mraa');

var Leds = []
for (var i = 0; i < 14; i++){
  var newLed = new mraa.Gpio(i);
  newLed.dir(mraa.DIR_OUT);
  newLed.write(1);
  Leds.push(newLed);
}

var ledState = true;
var i = 0;
var wait = "";
act();

function act() {
  wait = readline(); //Wait for user
  console.log("Light #" + i);
  console.log("State" + Leds[i].read());
  if (Leds[i].read() == 1){
    Leds[i].write(0);
  }
  else if (Leds[i].read() == 0){
    Leds[i].write(1);
  }
  //Leds[i].write(ledState?1:0);
  i += 1;
  if (i >= 14){
    i = 0;
  }  
  setTimeout(act, 1000);
}

