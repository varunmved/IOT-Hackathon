
var mraa = require('mraa');
var ultrasonic = require('jsupm_groveultrasonic');

//var trig = new mraa.Gpio(5);
//trig.dir(mraa.DIR_OUT);

//var echo = new mraa.Gpio(3);
//echo.dir(mraa.DIR_IN);

//ivar sensor = new sensor(trig, echo);
var sensor = new ultrasonic.GroveUltraSonic(3);

setInterval(sense, 500);

function sense(){
  console.log(sensor.getDistance());
}



