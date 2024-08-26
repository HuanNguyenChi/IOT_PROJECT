//package com.huannguyen.BE.constant;
//import org.eclipse.paho.client.mqttv3.*;
//public class Connect {
//    private static final String BROKER = "tcp://192.168.133.180:1883";
//    private static final String CLIENT_ID = "java_client";
//    private static final String[] TOPICS = { "LED_CONTROL_1", "LED_CONTROL_2", "LED_CONTROL_3" };
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
//            client.subscribe(Constant.DATA_SENSOR);
//            client.subscribe(Constant.LED_RESPONSE_1);
//            client.subscribe(Constant.LED_RESPONSE_2);
//            client.subscribe(Constant.LED_RESPONSE_3);
//
//
//        } catch (MqttException  e) {
//            e.printStackTrace();
//        }
//    }
//}
