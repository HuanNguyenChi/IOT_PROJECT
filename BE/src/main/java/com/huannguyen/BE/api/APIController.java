package com.huannguyen.BE.api;

import com.huannguyen.BE.constant.Constant;
import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.model.Device;
import com.huannguyen.BE.service.DataDeviceService;
import com.huannguyen.BE.service.DataSensorService;
import com.huannguyen.BE.service.DeviceService;
import com.huannguyen.BE.service.MosquittoService;
import com.huannguyen.BE.util.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/")
public class APIController {

    @Autowired
    private MosquittoService mosquittoService;

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
    public ResponseEntity<DataDevice> control(@RequestParam(value = "state") String state,
                                          @RequestParam(value = "id") Integer id) throws InterruptedException {
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
        String mes = state.equals("true") ? "0" : "1";

        mosquittoService.publishMessage(topic, mes);

        Thread.sleep(2000);

        Integer idDataDevice = Constant.sharedList.get(Constant.sharedList
                .size() - 1);


        DataDevice dataDevice = dataDeviceService.findById(idDataDevice);
        Device device = deviceService.findById(id);
        device.setStatus(dataDevice.getAction());
        deviceService.save(device);
        if(dataDevice.getDevice().getId().equals(id))
            return ResponseEntity.ok(dataDevice);
        return (ResponseEntity<DataDevice>) ResponseEntity.notFound();
    }


// DONE
    @GetMapping("datasensor")
    public ResponseEntity<List<DataSensor>> datasensor(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(value = "startTime", required = false) String startTime,
            @RequestParam(value = "field", required = false) String field,
            @RequestParam(value = "sort", required = false) String sort) {

        Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "time"));
        if(sort==null || sort.equals("")){
        }
        else if(sort.equals("increase")){
            if(field != null){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
            }else {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "time"));
            }
        }else if(sort.equals("decrease")){
            if(field != null){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));
            }else {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
            }
        }
        String start = "";
        if (startTime==null || "".equals(startTime)) {
            start = Time.getStartTime(1);

        } else {
            start = Time.getStartTime(Integer.parseInt(startTime));
        }
        String end = Time.getEndTime();

        List<DataSensor> list = dataSensorService.findByTimeBetween(start,end,pageable);
//        Collections.reverse(list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("datadevice")
    public ResponseEntity<List<DataDevice>> datadevice(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "20") int size,
                                                       @RequestParam(value = "startTime", required = false) String startTime,
                                                       @RequestParam(value = "endTime", required = false) String endTime,
                                                       @RequestParam(value = "sort", required = false) String sort) {

        Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "time"));
        if(sort == null || sort.equals("decrease")){

        }else if(sort.equals("increase")){
            pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.ASC, "time"));
        }
        String start = "";
        String end = "";
        if (startTime.isEmpty() && endTime.isEmpty()) {
            List<DataDevice> ans = dataDeviceService.findDataDeviceLimit(pageable);
            return ResponseEntity.ok(ans);
        }
        if(startTime.isEmpty() ) {
            start = Time.getStartTime(1);
        }else {
            start = Time.getStartTime(Integer.parseInt(startTime));
        }
        if(endTime.isEmpty() ) {
            end = Time.getEndTime();
        }else {
            end = Time.getStartTime(Integer.parseInt(endTime));
        }
        List<DataDevice> list = dataDeviceService.findByTimeBetween(start,end,pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("alldevice")
    public ResponseEntity<List<Device>> alldevice(){
        return ResponseEntity.ok(deviceService.findAll());
    }
}
