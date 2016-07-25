
var mraa = require('mraa');

var input = new mraa.Gpio(2);
input.dir(mraa.DIR_IN);

var output = new mraa.Gpio(3);
output.dir(mraa.DIR_OUT);


while(true){
  if (input.read() == 1){
    output.write(1);
  }
  else if (input.read() == 0){
    output.write(0);
  }
}





