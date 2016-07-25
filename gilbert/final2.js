
var mraa = require('mraa');
var ultrasonic = require('jsupm_groveultrasonic');

var buzzer = new mraa.Gpio(2);
buzzer.dir(mraa.DIR_OUT);

var redlight = new mraa.Gpio(3);
redlight.dir(mraa.DIR_OUT);

var greenlight = new mraa.Gpio(4);
greenlight.dir(mraa.DIR_OUT);

//var trig = new mraa.Gpio(1);
//trig.dir(mraa.DIR_OUT);

//var echo = new mraa.Gpio(0);
//echo.dir(mraa.DIR_IN);

//ivar sensor = new sensor(trig, echo);
var sensor = new ultrasonic.GroveUltraSonic(0);

setInterval(sense, 500);

function sense(){
  var travelTime = sensor.getDistance();
  if (travelTime > 0){
    var distance = (travelTime / 29 / 2 / 100).toFixed(3);
    console.log("distance: " + distance + " [m]");
  }
  //Cases
  if (distance < .3){
    buzzer.write(1);
    redlight.write(1);
    greenlight.write(0);
  }
  else if (distance < 1.5) {
    buzzer.write(0);
    redlight.write(1);
    greenlight.write(0);
  }
  else {
    buzzer.write(0);
    redlight.write(0);
    greenlight.write(1);
  }
}



