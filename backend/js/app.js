var socket = io.connect();

socket.on('temp', function (data) {
    var status = JSON.parse(data);
    Gauge.Collection.get('temp').setValue(status.farenheit);       
});

function toggle_led(state){
    
    socket.emit('toggle_led' , state ); 
    var button = $('#led_button'); 
    if(state === 'on'){
        button.attr("onclick", "toggle_led('off')"); 
        button.html('Turn off led'); 
    } else {
        button.attr("onclick", "toggle_led('on')"); 
        button.html("Turn on led") 
    }
}



