/*

Simple Serial communication with two devices
From p5 or other to arduino.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-output-from-p5-js/

Notes:
  - The serial.write() function is versatile.
    If you give it a variable or literal that’s a numeric data type,
    it will send it as its raw binary value.
    If you give it a string, however, it will send out that ASCII string.
    So be aware of the difference, and make sure you know whether your
    serial receiving device wants raw binary or ASCII-encoded data.

  - If you want to send ASCII-encoded serial data from P5.js, all you have
   to do is to serial.write() your string. Sending strings is the P5.serialport’s
   default behavior. On the Arduino side, you can read single characters one byte
    at a time simply as well. However, if you want to convert multi-byte number
    strings to numeric values, you’ll need a new function to read ASCII encoded
    numeric strings called parseInt().
*/

var serial; // hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';
var inData; // Incoming Serial Data
var outByte = 0; // Outgoing Serial Data

function setup() {
  createCanvas(400,300);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('err', serialError); // callback for errors
  serial.open(portName);  // open a serial port
}

function draw(){
  background(0);
  fill(255);
  text("incoming values: " + inData, 30,30); // display the incoming serial data as a string:
}

/* Callback function to handle the data */
function serialEvent(){
  var inByte = serial.read(); // read a byte from the serial port
  inData = inByte; // Store it global variable
}

/* Callback function to handle errors */
function serialError(err){
  console.log("Something is wrong: " + err);
}

/* Light the LED depending on the mouseY */
function mouseDragged(){
  outByte = int(map(mouseY, 0, height, 0, 255));  // map the mouseY to a range from 0 to 255:
  serial.write(outByte); // send it out the serial port

  // Use this when reading ASCII-encoded strings in Arduino (for the parseint())
  //serial.write(outByte + '\n');
}

/* Light the LED depending on the keyboard numbers */
function keyPressed(){
  // if(key >= 0 && key <= 9){ // if the user presses 0 through 9
  //   outByte = byte(key*25);  // map the key to a range from 0 to 225
  // }
  // serial.write(outByte); // send it out the serial port

  // Send data as ASCII
  if (key ==='H' || key ==='L') { // if the user presses H or L
    serial.write(key);              // send it out the serial port
    console.log(key);
  }
}
