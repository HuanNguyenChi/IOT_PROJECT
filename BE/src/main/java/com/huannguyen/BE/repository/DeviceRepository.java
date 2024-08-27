package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
    Device findById(int id);
//    void updateStatusById(int id, Boolean status);
}
