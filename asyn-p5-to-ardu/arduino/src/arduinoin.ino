/*
=====================
Simple Serial communication with two devices
From p5 or other to arduino.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-output-from-p5-js/

Notes:
-  If you want to send ASCII-encoded serial data from P5.js, all you have
   to do is to serial.write() your string. Sending strings is the P5.serialport’s
   default behavior. On the Arduino side, you can read single characters one byte
   at a time simply as well. However, if you want to convert multi-byte number
   strings to numeric values, you’ll need a new function to read ASCII encoded
   numeric strings called parseInt().

- It is also possible to read and interpret ASCII-encoded strings in Arduino.
  The String.parseInt() function reads an incoming string until it finds a non-numeric
  character, then converts the numeric string that it read into a long integer. This is
  a blocking function, meaning that String.parseInt() stops the program and does nothing
  until it sees a non-numeric character, or until a timeout passes. The timeout is normally
  one second (or 1000 milliseconds), but you can set it to a lower number of milliseconds
  using Serial.setTimeout().
=====================
*/

// CASE 1
/* Receives data as raw binary */
//
// void setup(){
//   Serial.begin(9600);
// }
//
// void loop(){
//   /* Read only if there's any serial data available */
//   if(Serial.available() > 0){
//     int inByte = Serial.read(); // Read the byte
//     Serial.write(inByte); // Send it back as raw binary
//     analogWrite(10, inByte); // use it to set the LED brigthness
//   }
// }

// CASE 2
/* Receives data as ASCII-Encoded Serial Data */
// const int ledPin = 13;
// int incomingByte;   // a variable to read incoming serial data into
//
// void setup(){
//   Serial.begin(9600);
//   pinMode(ledPin, OUTPUT);
// }
//
// void loop(){
//   if (Serial.available() > 0){  // see if there's incoming serial data
//     incomingByte = Serial.read(); // read it
//     if (incomingByte == 'H') {
//       digitalWrite(ledPin, HIGH);
//       Serial.write(incomingByte); // Send it back as raw binary
//     }
//     if (incomingByte == 'L'){
//       digitalWrite(ledPin, LOW);
//       Serial.write(incomingByte); // Send it back as raw binary
//     }
//   }
// }

// CASE 3
/* Read and interpret ASCII-encoded strings (ie: send 65 will return 'A') */
void setup() {
 Serial.begin(9600);    // initialize serial communications
 Serial.setTimeout(10); // set the timeout for parseInt
}

void loop() {
 if (Serial.available() > 0) {   // if there's serial data available
 int inByte = Serial.parseInt(); // read it
   if (inByte > 0) {
      Serial.write(inByte);      // send it back out as raw binary data
      analogWrite(5, inByte);    // use it to set the LED brightness
   }
 }
}
