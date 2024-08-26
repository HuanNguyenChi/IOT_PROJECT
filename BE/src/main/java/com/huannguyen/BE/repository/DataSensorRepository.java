package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DataSensorRepository extends JpaRepository<DataSensor, Integer> {

    @Query("select data from DataDevice data")
    List<DataSensor> findDataSensorLimit(Pageable pageable);
    @Query("SELECT ds FROM DataSensor ds WHERE ds.time BETWEEN :start AND :end")

    List<DataSensor> findByTimeBetween(String start, String end,Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByTemperature(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByHumidity(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByLight(String start, String end, Pageable pageable);




}
