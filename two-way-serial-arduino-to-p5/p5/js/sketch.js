/*

Two-Way (Duplex) Serial Communication Using An Arduino and P5.js
From arduino to p5 or other.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/two-way-duplex-serial-communication-using-p5js/

Example reads data from a ADXL3xx series accelerometer and a pushbutton.
Data is send so in order to read it we should do:
  Read the incoming serial data into a string until a carriage return and newline appear
  split the string into substrings on the commas
  convert the substrings into numbers
  assign the numbers to variables to change your program

  Open the serial port
  Wait for a Hello
  Send a byte to request data
  Begin loop:
  Wait for one set of data
  Send a byte to request new data
  end loop

*/


var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var locH, locV;        // location of the circle
var circleColor = 255; // color of the circle

function setup() {
 createCanvas(640, 480);          // make canvas
 smooth();                        // antialias drawing lines
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing

 serial.list();                   // list the serial ports
 serial.open(portName);           // open a serial port
}


function draw() {
 background(0);               // black background
 fill(circleColor);           // fill depends on the button
 ellipse(locH, locV, 50, 50); // draw the circle
}


/* Get the list of ports */
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {  // portList is an array of serial port names
   console.log(i + " " + portList[i]);  // Display the list the console:
 }
}

/* Serial Event callback */
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  /* Without the handshake */
  // if (inString.length > 0 ) {
  //   var sensors = split(inString, ',');            // split the string on the commas
  //   if (sensors.length > 2) {                      // if there are three elements
  //     locH = map(sensors[0], 250, 410, 0,width);   // element 0 is the locH
  //     locV = map(sensors[1], 250, 410, 0, height); // element 1 is the locV
  //     circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
  //   }
  // }

  /* With the handshake */
  if (inString.length > 0) {
    if (inString !== 'hello') {           // if you get hello, ignore it
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) { // if there are three elements
        locH = map(sensors[0], 250, 410, 0, width); // element 0 is the locH
        locV = map(sensors[1], 250, 410, 0, height); // element 1 is the locV
        circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }
    serial.write('x'); // send a byte requesting more serial data
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}
