package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public void submitRequest(Request request) {
        requestRepository.save(request);
    }

    // Additional request handling methods if needed
}
