package com.huannguyen.BE.service.impl;

import com.huannguyen.BE.model.Sensor;
import com.huannguyen.BE.repository.SensorRepository;
import com.huannguyen.BE.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SensorServiceImpl implements SensorService {
    @Autowired
    private SensorRepository sensorRepository;

    @Override
    public Sensor saveSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor findSensorById(int id) {
        return sensorRepository.findById(id);
    }
}
