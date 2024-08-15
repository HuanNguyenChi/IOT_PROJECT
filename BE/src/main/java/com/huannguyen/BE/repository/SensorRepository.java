package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer> {
    Sensor findById(int id);
}

