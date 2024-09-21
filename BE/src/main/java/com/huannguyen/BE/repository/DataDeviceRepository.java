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
    @Query("SELECT d FROM DataDevice d")
    List<DataDevice> findByPageable(Pageable pageable);

    DataDevice findTopByOrderByTimeDesc();

    @Query("SELECT d FROM DataDevice d WHERE " +
            "( STR(d.timeConvert)  LIKE CONCAT('%', :value, '%'))")
    List<DataDevice> findByTime( String value, Pageable pageable);

    @Query("SELECT d FROM DataDevice d WHERE d.name LIKE CONCAT('%', :value, '%')")
    List<DataDevice> findByNameLike(@Param("value") String value, Pageable pageable);

    @Query("SELECT d FROM DataDevice d WHERE STR(d.timeConvert) LIKE CONCAT('%', :value, '%')")
    List<DataDevice> findByTimeConvertLike(@Param("value") String value, Pageable pageable);

    @Query("SELECT d FROM DataDevice d WHERE " +
            "(:field = 'name' AND STR(d.name) LIKE CONCAT('%', :value, '%')) OR " +
            "(:field = 'time' AND STR(d.timeConvert) LIKE CONCAT('%', :value, '%'))")
    List<DataDevice> findByField(@Param("field") String field, @Param("value") String value,Pageable pageable);
}
