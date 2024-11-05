package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    public User authenticate(@RequestBody String username) {
        return userService.authenticateUser(username);
    }
}
