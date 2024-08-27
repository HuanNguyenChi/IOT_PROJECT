package com.huannguyen.BE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "device")
@AllArgsConstructor
@NoArgsConstructor
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "STATUS")
    private Boolean status;

}
