

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

//Thông tin WiFi
const char* ssid = "Deadline";
const char* password = "244466666";

// Cài đặt MQTT broker
const char* mqtt_server = "192.168.2.180";
const char* client_id = "esp8266_client";

// Cấu hình chân kết nối
#define DHT_PIN  D4
#define LED_PIN_1 D5    
#define LED_PIN_2 D6   
#define LED_PIN_3 D7   
#define LIGHT_SENSOR_PIN A0
#define DHT_TYPE DHT11 

// Tạo đối tượng DHT và WiFi Client
DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient espClient;
PubSubClient client(espClient);

// Kết nối WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("WiFi connected - ESP8266 IP address: ");
  Serial.println(WiFi.localIP());
}

// Xử lý tin nhắn nhận được từ MQTT
void callback(char* topic, byte* payload, unsigned int length) {

  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  if (strcmp(topic, "LED_CONTROL_1") == 0) {
    digitalWrite(LED_PIN_1, message.equals("1") ? HIGH : LOW);
    client.publish("LED_RESPONSE_1",  message.equals("1") ? "HIGH" : "LOW");
  } 
  else if (strcmp(topic, "LED_CONTROL_2") == 0) {
    digitalWrite(LED_PIN_2, message.equals("1") ? HIGH : LOW);
    client.publish("LED_RESPONSE_2",  message.equals("1") ? "HIGH" : "LOW");
  } 
  else if (strcmp(topic, "LED_CONTROL_3") == 0) {
    digitalWrite(LED_PIN_3, message.equals("1") ? HIGH : LOW);
    client.publish("LED_RESPONSE_3",  message.equals("1") ? "HIGH" : "LOW");
  }

}

// Kết nối lại nếu bị mất kết nối
void reconnect() {
  while (!client.connected()) {
    if (client.connect(client_id)) {
      client.subscribe("LED_CONTROL_1");
      client.subscribe("LED_CONTROL_2");
      client.subscribe("LED_CONTROL_3");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  pinMode(LED_PIN_1, OUTPUT);
  pinMode(LED_PIN_2, OUTPUT);
  pinMode(LED_PIN_3, OUTPUT);
  
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  
  delay(2000);
  dht.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  float light = analogRead(LIGHT_SENSOR_PIN);  

  String data = String(temperature) + " " + String(humidity) + " " + String(light) ;

  if (!isnan(temperature) && !isnan(humidity) && !isnan(light)) {
    client.publish("SENSOR/DATA", String(data).c_str());
  }

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" Humidity: ");
  Serial.print(humidity);
  Serial.print(" Light: ");
  Serial.println(light);

  delay(2000);
}
