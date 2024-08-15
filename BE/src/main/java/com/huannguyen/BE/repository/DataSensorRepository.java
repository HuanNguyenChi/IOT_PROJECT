package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataSensorRepository extends JpaRepository<DataSensor, Integer> {
}
