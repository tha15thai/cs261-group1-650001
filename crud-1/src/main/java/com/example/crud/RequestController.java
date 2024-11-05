package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping("/submit-request")
    public String submitRequest(@RequestBody Request request) {
        requestService.submitRequest(request);
        return "Request submitted successfully";
    }
}
