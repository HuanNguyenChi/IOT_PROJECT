package com.huannguyen.BE.service.impl;

import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.repository.DataDeviceRepository;
import com.huannguyen.BE.service.DataDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataDeviceServiceImpl implements DataDeviceService {

    @Autowired
    private DataDeviceRepository dataDeviceRepository;

    @Override
    public void save(DataDevice dataDevice) {
        dataDeviceRepository.save(dataDevice);
    }

    @Override
    public DataDevice findById(int id) {
        return dataDeviceRepository.findById(id);
    }

    @Override
    public List<DataDevice> findbyField(String field, String value, Pageable pageable) {
        return dataDeviceRepository.findByField(field,value,pageable);
    }

    @Override
    public List<DataDevice> findByPageable(Pageable pageable) {
        return dataDeviceRepository.findByPageable(pageable);
    }

    @Override
    public List<DataDevice> findByNameLike(String value, Pageable pageable) {
        return dataDeviceRepository.findByNameLike(value,pageable);
    }

    @Override
    public List<DataDevice> findByTimeConvertLike(String value, Pageable pageable) {
        return dataDeviceRepository.findByTimeConvertLike(value,pageable);
    }

}
