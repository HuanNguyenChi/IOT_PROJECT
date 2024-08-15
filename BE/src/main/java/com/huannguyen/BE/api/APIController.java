package com.huannguyen.BE.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class APIController {
    @GetMapping("dashboard")
    public String dashboard() {
        return "dashboard";
    }
}
