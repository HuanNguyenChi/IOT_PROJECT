package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "data_device")
@AllArgsConstructor
@NoArgsConstructor
public class DataDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "TIME")
    private Date time;

    @Column(name = "ACTION")
    private Boolean action;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TIMECONVERT")
    private String timeConvert;

    @ManyToOne()
    @JoinColumn(name = "DEVICE")
    private Device device;

}
