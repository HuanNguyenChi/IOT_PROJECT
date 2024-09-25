package com.huannguyen.BE.api;

import com.huannguyen.BE.constant.Constant;
import com.huannguyen.BE.model.DataDevice;
import com.huannguyen.BE.model.DataSensor;
import com.huannguyen.BE.model.Device;
import com.huannguyen.BE.service.DataDeviceService;
import com.huannguyen.BE.service.DataSensorService;
import com.huannguyen.BE.service.DeviceService;
import com.huannguyen.BE.service.MosquittoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
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
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
        List<DataSensor> sortedDataSensors = dataSensorService.findDataSensorLimit(pageable)
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

        while (true) {
            Integer idDataDevice = Constant.sharedList.get(Constant.sharedList
                    .size() - 1);
            DataDevice dataDevice = dataDeviceService.findById(idDataDevice);
            Device device = deviceService.findById(id);
            device.setStatus(dataDevice.getAction());
            deviceService.save(device);
            if (dataDevice.getDevice().getId().equals(id)) {
                return ResponseEntity.ok(dataDevice);
            } else {
                Thread.sleep(500);
            }
        }
    }


    // DONE
    @GetMapping("datasensor")
    public ResponseEntity<List<DataSensor>> datasensor(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(value = "field", required = false) String field,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "search", required = false) String search) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
        if (field.equals("null")) field = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (search == null || search.isEmpty()) {
            if(field == null ){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
            }
            else if (!field.isEmpty()) {
                if (order == null || order.isEmpty() || order.equals("decrease")) {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));
                } else {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
                }
            } else {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));
            }
        } else {
            if (!field.isEmpty()) {
                if (order == null || order.isEmpty() || order.equals("decrease") ) {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));
                } else if (order.equals("increase")) {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
                }
                List<DataSensor> ans = dataSensorService.findByField(field, search, pageable);
                return ResponseEntity.ok(ans);
            }
        }

        List<DataSensor> list = dataSensorService.findDataSensorLimit(pageable);
        list = sortDataSensor(list,field);
        return ResponseEntity.ok(list);
    }

    @GetMapping("datadevice")
    public ResponseEntity<List<DataDevice>> datadevice(@RequestParam(value = "page", defaultValue = "0") int page,
                                                       @RequestParam(value = "size", defaultValue = "20") int size,
                                                       @RequestParam(value = "search", required = false) String search,
                                                       @RequestParam(value = "sort", required = false) String sort,
                                                       @RequestParam(value = "field", required = false) String field) {
        List<DataDevice> list = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timeConvert"));
        if(field == null){
            if(sort == null){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timeConvert"));
            }
            else if (sort.equals("increase")) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "timeConvert"));
            } else if (sort.equals("decrease") || sort.isEmpty()) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timeConvert"));
            }
        }
        else if (field.equals("name")) {
            if(sort == null ){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "name"));
            }
            else if (sort.equals("increase")) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
            } else if ( sort == null ||sort.equals("decrease") || sort.isEmpty()) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "name"));
            }
        } else if(field.isEmpty() || field.equals("timeConvert")) {
            if(sort == null){
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timeConvert"));
            }
            else if (sort.equals("increase")) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "timeConvert"));
            } else if (sort == null || sort.equals("decrease") || sort.isEmpty()) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timeConvert"));
            }
        }
        if (search == null || search.isEmpty()) {
            list = dataDeviceService.findByPageable(pageable);
            if(field == null ){
                list.sort(new Comparator<DataDevice>() {
                    @Override
                    public int compare(DataDevice o1, DataDevice o2) {
                        if (o1.getName().equals(o2.getName())) {
                            return o2.getId().compareTo(o1.getId());
                        }
                        return o1.getName().compareTo(o2.getName());
                    }
                });
            }
            else if (field.equals("name")) {
                if (sort.equals("increase")) {
                    list.sort(new Comparator<DataDevice>() {

                        @Override
                        public int compare(DataDevice o1, DataDevice o2) {
                            if (o1.getName().equals(o2.getName())) {
                                return o2.getId().compareTo(o1.getId());
                            }
                            return o1.getName().compareTo(o2.getName());
                        }
                    });
                } else {
                    list.sort(new Comparator<DataDevice>() {
                        @Override
                        public int compare(DataDevice o1, DataDevice o2) {
                            if (o1.getName().equals(o2.getName())) {
                                return o2.getId().compareTo(o1.getId());
                            }
                            return o1.getName().compareTo(o2.getName());
                        }
                    });
                }
            }
        } else {
            if (field.equals("name")) {
                list = dataDeviceService.findByNameLike(search, pageable);
            } else {
                list = dataDeviceService.findByTimeConvertLike(search, pageable);
            }

        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("alldevice")
    public ResponseEntity<List<Device>> alldevice() {
        return ResponseEntity.ok(deviceService.findAll());
    }

    private List<DataSensor> sortDataSensor(List<DataSensor> list, String field) {
        if(field == null){
            return list;
        }
        else if (field.equals("temperature")) {
            list.sort(new Comparator<DataSensor>() {
                @Override
                public int compare(DataSensor o1, DataSensor o2) {
                    if (o1.getTemperature().compareTo(o2.getTemperature()) == 0) {
                        return o2.getId().compareTo(o1.getId());
                    }
                    return o1.getTemperature().compareTo(o2.getTemperature());
                }
            });
        } else if (field.equals("humidity")) {
            list.sort(new Comparator<DataSensor>() {
                @Override
                public int compare(DataSensor o1, DataSensor o2) {
                    if (o1.getHumidity().compareTo(o2.getHumidity()) == 0) {
                        return o2.getId().compareTo(o1.getId());
                    }
                    return o1.getHumidity().compareTo(o2.getHumidity());
                }
            });
        } else if (field.equals("light")) {
            list.sort(new Comparator<DataSensor>() {
                @Override
                public int compare(DataSensor o1, DataSensor o2) {
                    if (o1.getLight().compareTo(o2.getLight()) == 0) {
                        return o2.getId().compareTo(o1.getId());
                    }
                    return o1.getLight().compareTo(o2.getLight());
                }
            });
        } else if (field.equals("time")) {
            list.sort(new Comparator<DataSensor>() {
                @Override
                public int compare(DataSensor o1, DataSensor o2) {
                    if (o1.getTimeConvert().compareTo(o2.getTimeConvert()) == 0) {
                        return o2.getId().compareTo(o1.getId());
                    }
                    return o1.getTimeConvert().compareTo(o2.getTimeConvert());
                }
            });
        }

        return list;
    }
}
