package com.huannguyen.BE.service.impl;

import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.repository.DataSensorRepository;
import com.huannguyen.BE.service.DataSensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DataSensorServiceImpl implements DataSensorService {
    @Autowired
    private DataSensorRepository dataSensorRepository;

    @Override
    public List<DataSensor> findDataSensorLimit(Pageable pageable) {
        return dataSensorRepository.findDataSensorLimit(pageable);
    }

    @Override
    public List<DataSensor> findByTimeBetween(String start, String end,Pageable pageable) {
        return dataSensorRepository.findByTimeBetween(start, end,pageable);
    }

    @Override
    public List<DataSensor> findDataSensorByTimeBetweenOrderByTemperature(String start, String end, Pageable pageable) {
        return dataSensorRepository.findDataSensorByTimeBetweenOrderByTemperature(start, end,pageable);
    }

    @Override
    public List<DataSensor> findDataSensorByTimeBetweenOrderByHumidity(String start, String end, Pageable pageable) {
        return dataSensorRepository.findDataSensorByTimeBetweenOrderByHumidity(start, end,pageable);
    }

    @Override
    public List<DataSensor> findDataSensorByTimeBetweenOrderByLight(String start, String end, Pageable pageable) {
        return dataSensorRepository.findDataSensorByTimeBetweenOrderByLight(start, end,pageable);
    }

}
