package com.huannguyen.BE.service;

import com.huannguyen.BE.constant.Constant;
import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.model.Device;
import com.huannguyen.BE.repository.DataDeviceRepository;
import com.huannguyen.BE.repository.DataSensorRepository;
import com.huannguyen.BE.repository.DeviceRepository;
import com.huannguyen.BE.util.Time;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Service
public class MosquittoService {

    private MqttClient client;

    @Autowired
    private DataSensorRepository dataSensorRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DataDeviceRepository dataDeviceRepository;

    @Autowired
    private DeviceService deviceService;

    public MosquittoService()  {
        try {
             client = new MqttClient(Constant.BROKER, Constant.CLIENT_ID);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);

            // Connect to the MQTT broker
            System.out.println("Connecting to broker: " + Constant.BROKER);
            client.connect(options);
            System.out.println("Connected");

            // Set up a callback to handle messages
            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    System.out.println("Connection lost! " + cause.getMessage());
                    // Retry connection
                    while (!client.isConnected()) {
                        try {
                            System.out.println("Attempting to reconnect...");
                            client.connect(options);
                            // Subscribe to topics
                            client.subscribe(Constant.DATA_SENSOR);
                            client.subscribe(Constant.LED_RESPONSE_1);
                            client.subscribe(Constant.LED_RESPONSE_2);
                            client.subscribe(Constant.LED_RESPONSE_3);
                            System.out.println("Reconnected to MQTT broker");
                        } catch (MqttException e) {
                            System.out.println("Reconnection failed, will retry in 5 seconds.");
                            try {
                                Thread.sleep(5000); // Wait 5 seconds before retrying
                            } catch (InterruptedException ex) {
                                ex.printStackTrace();
                            }
                        }
                    }
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    handleIncomingMessage(topic,message);
                    System.out.println("Message arrived. Topic: " + topic + ", Message: " + new String(message.getPayload()));
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {
                    System.out.println("Delivery complete");
                }
            });

            // Subscribe to topics
            client.subscribe(Constant.DATA_SENSOR);
            client.subscribe(Constant.LED_RESPONSE_1);
            client.subscribe(Constant.LED_RESPONSE_2);
            client.subscribe(Constant.LED_RESPONSE_3);


        } catch (MqttException  e) {
            e.printStackTrace();
        }
    }

    private void handleIncomingMessage(String topic, MqttMessage message) {
        if (Constant.DATA_SENSOR.equals(topic)) {
            String data = new String(message.getPayload());
            DataSensor sensorData = new DataSensor();

            Double [] arrayData = Arrays.stream(data.split(" "))
                    .map(Double::valueOf)
                    .toArray(Double[]::new);
            sensorData.setTemperature(arrayData[0]);
            sensorData.setHumidity(arrayData[1]);
            sensorData.setLight(1024 - arrayData[2]);
            sensorData.setTime((Time.getTimeLocal()));
            sensorData.setTimeConvert((Time.getTimeLocalConvert()));
            dataSensorRepository.save(sensorData);

        } else if (Constant.LED_RESPONSE_1.equals(topic)) {
            DataDevice dataDevice = getResponseMQTT(1, message);
            DataDevice data = dataDeviceRepository.save(dataDevice);
            Constant.sharedList.add(data.getId());

        } else if (Constant.LED_RESPONSE_2.equals(topic)) {
            DataDevice dataDevice = getResponseMQTT(2, message);
            DataDevice data = dataDeviceRepository.save(dataDevice);
            Constant.sharedList.add(data.getId());

        } else if (Constant.LED_RESPONSE_3.equals(topic)) {
            DataDevice dataDevice = getResponseMQTT(3, message);
            DataDevice data = dataDeviceRepository.save(dataDevice);
            Constant.sharedList.add(data.getId());
        }
    }

    public void publishMessage(String topic, String messageContent) {
        try {
            MqttMessage message = new MqttMessage(messageContent.getBytes());
            message.setQos(2);
            client.publish(topic, message);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    private DataDevice getResponseMQTT(int id, MqttMessage message) {
        String data = new String(message.getPayload());
        DataDevice dataDevice = new DataDevice();
        Device device = deviceRepository.findById(id);
        dataDevice.setDevice(device);
        dataDevice.setTime(Time.getTimeLocal());
        dataDevice.setTimeConvert(Time.getTimeLocalConvert());
        dataDevice.setName(device.getName());
        dataDevice.setAction(data.equals("HIGH"));

        return dataDevice;
    }

}
