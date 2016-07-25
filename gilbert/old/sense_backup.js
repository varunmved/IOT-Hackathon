
var mraa = require('mraa');

var trig = new mraa.Gpio(5);
trig.dir(mraa.DIR_OUT);
var echo = new mraa.Gpio(3);
echo.dir(mraa.DIR_IN);

//start 10 microsecond trigger pulse
trigger();

//Write results back to console periodically
setInterval(read_data, 1000);

function trigger(){
  trig.write(1);
  setTimeout(trigger_end, 1);
}
function trigger_end(){
  trig.write(0);
}
function read_data(){
  console.log(echo.read());
}



