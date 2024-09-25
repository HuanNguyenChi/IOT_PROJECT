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

    @Query("select data from DataSensor data")
    List<DataSensor> findDataSensorLimit(Pageable pageable);

    @Query("SELECT ds FROM DataSensor ds WHERE ds.time BETWEEN :start AND :end")
    List<DataSensor> findByTimeBetween(String start, String end,Pageable pageable);

    @Query("SELECT d FROM DataSensor d WHERE " +
            "(:field = 'temperature' AND STR(d.temperature) LIKE CONCAT('%', :value, '%')) OR " +
            "(:field = 'humidity' AND STR(d.humidity) LIKE CONCAT('%', :value, '%')) OR " +
            "(:field = 'light' AND STR(d.light) LIKE CONCAT('%', :value, '%')) OR " +
            "(:field = 'time' AND STR(d.timeConvert) LIKE CONCAT('%', :value, '%')) OR " +
            "(:field = 'windy' AND STR(d.windy) LIKE CONCAT('%', :value, '%')) ")
    List<DataSensor> findByField(@Param("field") String field, @Param("value") String value,Pageable pageable);

    @Query("SELECT COUNT(d) FROM DataSensor d WHERE d.windy >= 70 AND d.timeConvert LIKE CONCAT(:time, '%')")
    long countWindyGreaterThan70(@Param("time") String time);

    @Query("SELECT d FROM DataSensor d WHERE " +
            "STR(d.temperature) LIKE CONCAT('%', :value, '%') and " +
            "STR(d.humidity) LIKE CONCAT('%', :value, '%') and " +
            "STR(d.light) LIKE CONCAT('%', :value, '%') and " +
            "STR(d.timeConvert) LIKE CONCAT('%', :value, '%') and " +
            "STR(d.windy) LIKE CONCAT('%', :value, '%')")
    List<DataSensor> findByValueInAllFields(@Param("value") String value, Pageable pageable);


    List<DataSensor> findDataSensorByTimeBetweenOrderByTemperature(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByHumidity(String start, String end, Pageable pageable);
    List<DataSensor> findDataSensorByTimeBetweenOrderByLight(String start, String end, Pageable pageable);




}
