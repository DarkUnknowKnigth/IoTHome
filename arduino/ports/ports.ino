void setup() {
  Serial.begin(9600);
  pinMode(13,OUTPUT);

}
void loop() {
  if(Serial.available()>0)
  {
    char option = Serial.read();
    if(option>= '1' && option <='9')
    {
      option -='0';
      for(int i=0;i<option;i++)
      {
        digitalWrite(13,1);
        delay(100);
        digitalWrite(13,1);
        delay(100);
        Serial.write(0);
      }
    }
  }
}
