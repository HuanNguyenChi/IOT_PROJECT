package com.huannguyen.BE.service;

import com.huannguyen.BE.model.DataSensor;

public interface DataSensorService {
    DataSensor findDataSensorByID(int id);
    DataSensor saveDataSensor(DataSensor dataSensor);
    DataSensor updateDataSensor(DataSensor dataSensor);
    void deleteDataSensor(int id);
}
