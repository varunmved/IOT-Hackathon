
var mraa = require('mraa');
var SPEED_OF_SOUND = 343; //meters per second

var trig = new mraa.Gpio(5);
trig.dir(mraa.DIR_OUT);
var echo = new mraa.Gpio(3);
echo.dir(mraa.DIR_IN);

//Write results back to console periodically
setInterval(read_data, 1000);

//10 microsecond trigger pulse
function trigger(){
  trig.write(1);
  setTimeout(trigger_end, .01);
}
function trigger_end(){
  trig.write(0);
}
function read_data(){
  var timer = Date.now;
  trigger();
  while (echo.read() != 1){
    timer = Date.now;
  }
  var end_timer = Date.now;
  var total_time = end_timer - timer;
  var distance = total_time / 1000 * SPEED_OF_SOUND;
  console.log(distance + " meters");
}



