package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class DataSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "HUMIDITY")
    private Integer humidity;

    @Column(name = "TEMPERATURE")
    private Double temperature;

    @Column(name = "LIGHT")
    private Integer light;

    @Column(name = "TIME")
    private Date time;

    @ManyToOne
    @JoinColumn(name = "ID_SENSOR")
    private Sensor idSensor;
}
