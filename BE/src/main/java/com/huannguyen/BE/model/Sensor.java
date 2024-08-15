package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column (name = "SENSOR_NAME")
    private String sensorName;

    @Column(name = "SENSOR_TYPE")
    private String sensorType;

    @Column(name = "NOTE")
    private String note;
}
