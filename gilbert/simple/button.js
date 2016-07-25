
var mraa = require('mraa');

var button = new mraa.Gpio(2);
button.dir(mraa.DIR_IN);

var light = new mraa.Gpio(3);
light.dir(mraa.DIR_OUT);


while(true){
  if (button.read() == 1){
    light.write(1);
  }
  else if (button.read() == 0){
    light.write(0);
  }
}








