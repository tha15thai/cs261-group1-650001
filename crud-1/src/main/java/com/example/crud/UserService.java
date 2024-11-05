package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User authenticateUser(String username) {
        return userRepository.findByUsername(username);
    }

    // Additional user management methods if needed
}
