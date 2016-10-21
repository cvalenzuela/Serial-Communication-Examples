/*

Simple Serial communication with one device
From Arduino to p5 or other serial.
October 2016.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/

*/

/* Variables */
var serial; // instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // port in use for arduino
var options = {baudrate: 9600}; // optional: change the data rate to whatever. 9600 is default
var inData;
var xPos = 0;

/* Callback functions */
function printList(portList){
  for (var i = 0; i < portList.length; i++){
    console.log(i + " " + portList[i]);
  }
}

function serverConnected(){
  console.log('connected to server.');
}

function portOpen(){
  console.log('the serial port is now opened.');
}

function serialEvent(){
  /* Show as byte */
  inData = serial.read();
  //inData = Number(serial.read()); // String to number converter

  /* Reads the incoming serial data as a string,
  and when that string happens to be all-numeric,
  it converts it to a number. This uses inString.length
  to check only when data is sent */
  var inString = serial.readLine(); // read a string from the serial port:
  if (inString.length > 0 ) { // check to see that there's actually a string there:
    inData = Number(inString);// convert it to a number:
  }


}

function serialError(err){
  console.log('Something went wrong with the serial port' + err);
}

function portClose(){
  console.log('The serial port is closed')
}
/* Callback functions */


function setup() {
  createCanvas(300,300);
  background(255);
  serial = new p5.SerialPort();
  serial.on('list', printList); // callback for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError);  // callback for errors
  serial.on('close', portClose);  // callback for the port closing

  serial.list(); // Call the serial.list function and use printlist as callback
  serial.open(portName, options); // Call the serial.open and use portOpen as callback with argument of portName
}

function draw(){
  /* Show as raw byte */
  background(255);
  text("sensor value " +  inData, 30, 30);


  /* Graph the data */
  //graphData(inData);
}

function graphData(newData) {
  var yPos = map(newData, 0, 255, 0, height);   // map the range of the input to the window height
  stroke(0xA8, 0xD9, 0xA7);  // draw the line in a pretty color
  line(xPos, height, xPos, height - yPos); // at the edge of the screen, go back to the beginning
  if (xPos >= width) {
    xPos = 0;
    background(0x08, 0x16, 0x40);// clear the screen by resetting the background:
  } else {
    xPos++; // increment the horizontal position for the next reading:
  }
}
