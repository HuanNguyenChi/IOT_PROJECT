package com.huannguyen.BE.service.impl;

import com.huannguyen.BE.model.Device;
import com.huannguyen.BE.repository.DeviceRepository;
import com.huannguyen.BE.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceServiceImpl implements DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public void updateStatus(Device device) {
        deviceRepository.save(device);
    }

    @Override
    public Device findById(int id) {
        return deviceRepository.findById(id);
    }

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Override
    public Device save(Device device) {
        return deviceRepository.save(device);
    }


}
