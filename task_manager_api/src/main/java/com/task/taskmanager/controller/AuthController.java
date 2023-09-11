package com.task.taskmanager.controller;

import com.task.taskmanager.bean.ApiResponse;
import com.task.taskmanager.bean.LoginRequest;
import com.task.taskmanager.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(new ApiResponse(token, true, ""));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse("", false, "Authentication failed"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody LoginRequest loginRequest) {
        try {
            userService.registerUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(new ApiResponse("", true, ""));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse("", false, "Authentication failed"));
        }
    }
}
