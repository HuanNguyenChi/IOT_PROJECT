package com.huannguyen.BE.repository;

import com.huannguyen.BE.model.DataDevice;
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
public interface DataDeviceRepository extends JpaRepository<DataDevice,Integer> {
    DataDevice findById(int id);
    @Query("select data from DataDevice data")
    List<DataDevice> findDataDeviceLimit(Pageable pageable);

    List<DataDevice> findByDeviceId(int deviceId);
    @Query("SELECT dv FROM DataDevice dv WHERE dv.time BETWEEN :start AND :end")
    List<DataDevice> findByTimeBetween(String start, String end,Pageable pageable);

    DataDevice findTopByOrderByTimeDesc();

    @Query("SELECT d FROM DataDevice d WHERE " +
            "( d.time LIKE CONCAT('%', :value, '%'))")
    List<DataDevice> findByTime( String value, Pageable pageable);
}
