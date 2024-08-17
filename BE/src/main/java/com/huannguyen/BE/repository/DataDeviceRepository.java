package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.DataDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataDeviceRepository extends JpaRepository<DataDevice, Long> {
}
