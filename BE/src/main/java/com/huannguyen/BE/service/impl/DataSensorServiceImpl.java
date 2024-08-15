package com.huannguyen.BE.service.impl;

import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.repository.DataSensorRepository;
import com.huannguyen.BE.service.DataSensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataSensorServiceImpl implements DataSensorService {
    @Autowired
    private DataSensorRepository dataSensorRepository;

    @Override
    public DataSensor findDataSensorByID(int id) {
        return dataSensorRepository.findById(id).get();
    }

    @Override
    public DataSensor saveDataSensor(DataSensor dataSensor) {
        return dataSensorRepository.save(dataSensor);
    }

    @Override
    public DataSensor updateDataSensor(DataSensor dataSensor) {
        return dataSensorRepository.save(dataSensor);
    }

    @Override
    public void deleteDataSensor(int id) {
        dataSensorRepository.deleteById(id);
    }
}
