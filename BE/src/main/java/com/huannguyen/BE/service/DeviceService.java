package com.huannguyen.BE.service;

import com.huannguyen.BE.model.Device;

public interface DeviceService {
    void updateStatus(Device device);
    Device findById(int id);
}
