package com.huannguyen.BE.service;

import com.huannguyen.BE.model.Device;

import java.util.List;

public interface DeviceService {
    void updateStatus(Device device);
    Device findById(int id);
    List<Device> findAll();
    Device save (Device device);
//    void updateDeviceByStatus(int id,String status);
}
