package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "data_sensor")
@AllArgsConstructor
@NoArgsConstructor
public class DataSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "HUMIDITY")
    private String humidity;

    @Column(name = "TEMPERATURE")
    private String temperature;

    @Column(name = "LIGHT")
    private String light;

    @Column(name = "TIME")
    private String time;

    @ManyToOne
    @JoinColumn(name = "ID_SENSOR")
    private Sensor idSensor;
}
