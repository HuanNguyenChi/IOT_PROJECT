package com.huannguyen.BE.service;

import com.huannguyen.BE.model.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface DataSensorService {
    List<DataSensor> findDataSensorLimit(Pageable pageable);
    List<DataSensor> findByTimeBetween(String start, String end,Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByTemperature(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByHumidity(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByLight(String start, String end, Pageable pageable);
}
