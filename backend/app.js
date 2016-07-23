/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */


//Setup express 
var express = require('express');
var app = express();
app.use(express.static(__dirname));
var server = app.listen(8085);
var io = require('socket.io').listen(server);



var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output



var x = new mraa.I2c(1);  //We will use a device in I2C bus number 1 on mini breakout. 
                          //Use port 6 on Arduino board 
x.address(0x18);          //Default for MCP9808 is 0x10


io.sockets.on('connection', function (socket) {
     
    setInterval(function () {     
        socket.emit( 'temp' , JSON.stringify(getTemp())); //send temp every interval
    }, 2000);

    
    socket.on('toggle_led', function(data){
        if(data === 'on'){
            myOnboardLed.write(0);
        } else {
            myOnboardLed.write(1); 
        }
    });
    

});

function getTemp(){
    
    var t = x.readWordReg(5);  // 0x05 is the register for the current temp. 
  //The byte order of words is not the same between Edison and the MCP9808
  //The edison stores the most significant byte first - big endian, where the 
  //MCP9808 stores the lowest byte first -- little endian. 
    
    var s = ((t & 0xFF) << 8) | ((t >> 8 ) & 0xFF);  //swap the bytes. 
    var r = s & 0xFFF;  // Mask of the control bits to get the temp value
    r /= 16.0;  // dividing by 16 will give us the temp in celcius as long as the temp is above 0. 

    s = r * 9 / 5 + 32;  //get the farenheit value.

    return { 'celcius': r , 'farenheit' : s  }; 

}



