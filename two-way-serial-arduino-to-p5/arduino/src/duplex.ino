/*

Two-Way (Duplex) Serial Communication Using An Arduino and P5.js
From arduino to p5 or other.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/two-way-duplex-serial-communication-using-p5js/

Example sends data of ADXL3xx series accelerometer and a pushbutton

Open the serial port
Wait for a Hello
Send a byte to request data
Begin loop:
  Wait for one set of data
  Send a byte to request new data
end loop

*/


#define buttonPin 2

void setup(){
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);

  /* Add handshake function */
  while (Serial.available() <= 0) {
    Serial.println("hello"); // send a starting message
    delay(300);              // wait 1/3 second
  }
}

void loop(){

  if (Serial.available() > 0) {
    /* X Axis */
    int sensorValue = analogRead(A0);
    Serial.print(sensorValue); // Send as ASCII encoded
    Serial.print(",");

    /* Y Axis */
    sensorValue = analogRead(A1);
    Serial.print(sensorValue); // Send as ASCII encoded
    Serial.print(",");

    /* read pushbutton */
    sensorValue = digitalRead(buttonPin);
    Serial.println(sensorValue); // Send as ASCII encoded
  }
}
