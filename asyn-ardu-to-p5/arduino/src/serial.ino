/*

Simple Serial communication with one device
From Arduino to p5 or other serial.
October 2016.
Made from here: https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
Using a softpot to send values.

Notes:
 - The function Serial.write writes binary data to the serial port.
    This data is sent as a byte or series of bytes.

-  Serial.write(val)
   Serial.write(str)
   Serial.write(buf, len)

   Parameters
   val: a value to send as a single byte
   str: a string to send as a series of bytes
   buf: an array to send as a series of bytes
   len: the length of the buffer

-  Serial.println():
   it converts a number to a string of bytes, each of which is the
   ASCII value for a numeral in the number.
   ex: the number 856 is transformed to:
   byte[0] = Nº8 = ASCII 56 +
   byte[1] = Nº6 = ASCII 54 +
   byte[2] = Nº5 = ASCII 53 +
   byte[3] = \r = ASCII 13 +
   byte[4] = \n = ASCII 10

   How to send a value that has two bytes with Serial.write() = send two bytes:
   the first one will be the multiplier of 255. So to send 1023 we will need to send
   0000 0011 = 3
   1111 1111 = 255
   So 3x255 + 255 = 1023
*/

unsigned long data = 1023; // Send a number that is bigger than 1 byte(255)

void setup() {
  Serial.begin(9600);
}

void loop() {
  //int potentiometer = analaogRead(A0);
  //int mappedPot = map(potentiometer, 0 ,1023, 0,255); // remap the pot value to fit in 1 byte

  /* Send byte values */
  //Serial.write(mappedPot);
  Serial.write(1023); // "a" will send 97 = ASCII value for "a"

  /* Send as ASCII-encoded numeric string */
  //Serial.println(mappedPot); // We need to use serial.readLine() in p5

  delay(1); // slight delay to stabilize the ADC
}
