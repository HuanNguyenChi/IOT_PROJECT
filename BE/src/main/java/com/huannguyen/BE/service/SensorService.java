package com.huannguyen.BE.service;

import com.huannguyen.BE.model.Sensor;

public interface SensorService {
    Sensor saveSensor(Sensor sensor);
    Sensor findSensorById(int id);

}
