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

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
            @RequestParam(defaultValue = "20") int size) {

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

        while(true){
            Integer idDataDevice = Constant.sharedList.get(Constant.sharedList
                    .size() - 1);
            DataDevice dataDevice = dataDeviceService.findById(idDataDevice);
            Device device = deviceService.findById(id);
            device.setStatus(dataDevice.getAction());
            deviceService.save(device);
            if (dataDevice.getDevice().getId().equals(id)){
                return ResponseEntity.ok(dataDevice);
            }else {
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
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "search", required = false) String search) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time"));

        if (search != null && !search.isEmpty() && field != null && !field.isEmpty()) {
            if (sort != null && !sort.isEmpty()) {
                if (sort.equals("decrease")) {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));

                } else {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
                }
            }
            List<DataSensor> ans = dataSensorService.findByField(field, search, pageable);
            return ResponseEntity.ok(ans);
        } else {
            if (sort != null && sort.equals("increase")) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "time"));
            } else if (sort != null && field != null) {
                if (sort.equals("decrease")) {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, field));

                } else {
                    pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
                }
            }
        }


        List<DataSensor> list = dataSensorService.findDataSensorLimit(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("datadevice")
    public ResponseEntity<List<DataDevice>> datadevice(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "20") int size,
                                                       @RequestParam(value = "search", required = false) String search,
                                                       @RequestParam(value = "sort", required = false) String sort
    ) {
        List<DataDevice> list = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Pageable pageable = PageRequest.of(page, size);
        if (search == null || search.isEmpty()) {
            list = dataDeviceService.findDataDeviceLimit(pageable);
        } else {
            list = dataDeviceService.findByTime(search, pageable);
            list = customSort(sort,list);
            return ResponseEntity.ok(list);
        }
        list = customSort(sort,list);

        return ResponseEntity.ok(list);
    }

    @GetMapping("alldevice")
    public ResponseEntity<List<Device>> alldevice() {
        return ResponseEntity.ok(deviceService.findAll());
    }

    private static List<DataDevice> customSort(String sort, List<DataDevice> list){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Collections.sort(list, new Comparator<DataDevice>() {
            @Override
            public int compare(DataDevice d1, DataDevice d2) {
                try {
                    Date date1 = dateFormat.parse(d1.getTime());
                    Date date2 = dateFormat.parse(d2.getTime());
                    if(sort == null || sort.isEmpty() || sort.equals("decrease")) {
                        return date2.compareTo(date1);
                    }else if(sort.equals("increase")){
                        return date1.compareTo(date2);
                    }else {
                        return 0;
                    }
                } catch (ParseException e) {
                    throw new IllegalArgumentException(e);
                }
            }
        });
        return list;
    }
}
