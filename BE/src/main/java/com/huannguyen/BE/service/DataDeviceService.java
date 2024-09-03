package com.huannguyen.BE.service;

import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DataDeviceService {
    void save(DataDevice dataDevice);
    DataDevice findById(int id);
    List<DataDevice> findDataDeviceLimit(Pageable pageable);
    List<DataDevice> findByTime( String value, Pageable pageable);
    DataDevice findLastest();
    List<DataDevice> findByTimeBetween(String startTime, String endTime,Pageable pageable);
    List<DataDevice> findDataSensorLimit(Pageable pageable);
}
