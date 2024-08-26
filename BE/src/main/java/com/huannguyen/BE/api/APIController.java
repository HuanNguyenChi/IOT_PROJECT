package com.huannguyen.BE.api;

import com.huannguyen.BE.constant.Constant;
import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.service.DataDeviceService;
import com.huannguyen.BE.service.DataSensorService;
import com.huannguyen.BE.service.DeviceService;
//import com.huannguyen.BE.service.MosquittoService;
import com.huannguyen.BE.util.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/")
public class APIController {

//    @Autowired
//    private MosquittoService mosquittoService;

    @Autowired
    private DataSensorService dataSensorService;

    @Autowired
    private DataDeviceService dataDeviceService;

    @Autowired
    private DeviceService deviceService;


    @GetMapping("")
    public ResponseEntity<List<DataSensor>> dashboard(
            @RequestParam(value = "startTime", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam(value = "endTime", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        String start = "";
        String end = "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        if (startTime == null) {
            start = Time.getStartTime(1);
        } else {
            start = formatter.format(startTime);
        }

        if (endTime == null) {
            end = Time.getEndTime();
        } else {
            end = formatter.format(endTime);
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
        List<DataSensor> sortedDataSensors = dataSensorService.findByTimeBetween(start, end, pageable)
                .stream()
                .sorted(Comparator.comparing(DataSensor::getTime).reversed())
                .collect(Collectors.toList());
        return ResponseEntity.ok(sortedDataSensors);
    }

    @GetMapping("led")
    public ResponseEntity<String> control(@PathVariable boolean state,
                                          @PathVariable int id) {
        String topic = "";
        switch (id) {
            case 1:
                topic = Constant.LED_CONTROL_1;
                break;
            case 2:
                topic = Constant.LED_CONTROL_2;
                break;
            case 3:
                topic = Constant.LED_CONTROL_3;
                break;
            default:
                break;
        }
        String mes = state ? "1" : "0";
//        mosquittoService.publishMessage(topic, mes);

        DataDevice dataDevice = dataDeviceService.findLastest();
        if (dataDevice.getDevice().getId() == id && dataDevice.getAction() == state) {
            return ResponseEntity.ok("true");
        }

        return ResponseEntity.ok("true");
    }


// DONE
    @GetMapping("datasensor")
    public ResponseEntity<List<DataSensor>> datasensor(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(value = "startTime", required = false) String startTime,
            @RequestParam(value = "startTime", required = false) String field,
            @RequestParam(value = "sort", required = false) String sort) {

        Pageable pageable = PageRequest.of(page, size); ;
        if(sort.equals("increase")){
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
        }else if(sort.equals("decrease")){
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));
        }
        String start = "";
        if (startTime == null) {
            start = Time.getStartTime(1);
        } else {
            start = Time.getStartTime(Integer.parseInt(startTime));
        }
        String end = Time.getEndTime();

        List<DataSensor> list = dataSensorService.findByTimeBetween(start,end,pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("datadevice")
    public ResponseEntity<List<DataDevice>> datadevice(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size,
                                                       @RequestParam(value = "startTime", required = false) String startTime,
                                                       @RequestParam(value = "endTime", required = false) String endTime) {
        Pageable pageable = PageRequest.of(page, size);
        String start = "";
        String end = "";
        if(startTime == null) {
            start = Time.getStartTime(1);
        }else {
            start = Time.getStartTime(Integer.parseInt(startTime));
        }
        if(endTime == null) {
            end = Time.getEndTime();
        }else {
            end = Time.getStartTime(Integer.parseInt(endTime));
        }
        List<DataDevice> list = dataDeviceService.findByTimeBetween(start,end,pageable);
        return ResponseEntity.ok(list);
    }
}
