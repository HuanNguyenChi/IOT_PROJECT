package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private String time;

    @Column(name = "ACTION")
    private Boolean action;

    @Column(name = "NAME")
    private String name;

    @ManyToOne()
    @JoinColumn(name = "DEVICE")
    private Device device;

}
