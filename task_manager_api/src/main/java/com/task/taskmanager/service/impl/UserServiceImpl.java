package com.task.taskmanager.service.impl;

import com.task.taskmanager.entity.User;
import com.task.taskmanager.repository.UserRepository;
import com.task.taskmanager.service.UserService;
import com.task.taskmanager.utils.JwtTokenUtil;
import javassist.NotFoundException;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public User loadUserByUsername(String username) throws Exception {
        User user = userRepository.findByUserName(username);
        if (user != null && user.getUserName() != null && user.getUserName().equals(username)) {
            return user;
        } else {
            throw new NotFoundException("User not found");
        }
    }

    @Override
    public String authenticateUser(String username, String password) throws Exception {
        User user = loadUserByUsername(username);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10, new SecureRandom());
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword())) {
            String token = jwtTokenUtil.generateToken(user);
            return token;
        } else {
            throw new NotFoundException("Invalid credentials");
        }
    }

    @Override
    public void registerUser(String username, String password) throws Exception {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10, new SecureRandom());
        User user = new User();
        user.setUserName(username);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
        return;
    }
}
