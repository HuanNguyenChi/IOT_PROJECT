package com.huannguyen.BE.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Time {
    public static String getStartTime(int hoursAgo) {
        LocalDateTime currentDateTime = LocalDateTime.now().minusHours(hoursAgo);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return currentDateTime.format(formatter);
    }

    public static String getTimeLocalConvert() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return currentDateTime.format(formatter);
    }
    public static Date getTimeLocal() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        Date date = Date.from(currentDateTime.atZone(ZoneId.systemDefault()).toInstant());
        return date;
    }
}
