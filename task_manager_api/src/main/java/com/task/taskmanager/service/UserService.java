package com.task.taskmanager.service;

import com.task.taskmanager.entity.User;

public interface UserService {
    User loadUserByUsername(String username) throws Exception;
    String authenticateUser(String username, String password) throws Exception;
    void registerUser(String username, String password) throws Exception;
}

