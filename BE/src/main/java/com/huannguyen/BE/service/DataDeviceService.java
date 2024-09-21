package com.huannguyen.BE.service;

import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DataDeviceService {
    void save(DataDevice dataDevice);
    DataDevice findById(int id);
    List<DataDevice> findbyField( String field,  String value, Pageable pageable);
    List<DataDevice> findByPageable(Pageable pageable);
    List<DataDevice> findByNameLike(String value, Pageable pageable);

    List<DataDevice> findByTimeConvertLike( String value, Pageable pageable);
}
