//package com.huannguyen.BE.constant;
//import org.eclipse.paho.client.mqttv3.*;
//
//import java.util.Scanner;
//
//public class Connect {
//    private static final String BROKER = "tcp://192.168.1.9:1883";
//    private static final String CLIENT_ID = "java_client";
//
//    public static void main(String[] args) {
//        try {
//            MqttClient client = new MqttClient(BROKER, CLIENT_ID);
//            MqttConnectOptions options = new MqttConnectOptions();
//            options.setCleanSession(true);
//
//            // Connect to the MQTT broker
//            System.out.println("Connecting to broker: " + BROKER);
//            client.connect(options);
//            System.out.println("Connected");
//
//            // Set up a callback to handle messages
//            client.setCallback(new MqttCallback() {
//                @Override
//                public void connectionLost(Throwable cause) {
//                    System.out.println("Connection lost: " + cause.getMessage());
//                }
//
//                @Override
//                public void messageArrived(String topic, MqttMessage message) throws Exception {
//                    System.out.println("Message arrived. Topic: " + topic + ", Message: " + new String(message.getPayload()));
//                }
//
//                @Override
//                public void deliveryComplete(IMqttDeliveryToken token) {
//                    System.out.println("Delivery complete");
//                }
//            });
//
//            // Subscribe to topics
//            client.subscribe("SERVERMQTT");
//
//
//            // pubish message
//            String mes = "hello world";
//            MqttMessage message = new MqttMessage(mes.getBytes());
//            message.setQos(2);
//            client.publish("SERVERMQTT", message);
//            while(true){
//                Scanner scanner = new Scanner(System.in);
//                System.out.print("Enter your message: ");
//                mes = scanner.nextLine();
//                MqttMessage message2 = new MqttMessage(mes.getBytes());
//                message2.setQos(2);
//                client.publish("SERVERMQTT", message2);
//            }
//
//        } catch (MqttException  e) {
//            e.printStackTrace();
//        }
//    }
//}
