package com.task.taskmanager.service.impl;

import com.task.taskmanager.entity.User;
import com.task.taskmanager.repository.UserRepository;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testLoadUserByUsername_ExistingUser() throws Exception {
        String username = "user";
        User mockUser = new User();
        mockUser.setUserName(username);

        when(userRepository.findByUserName(username)).thenReturn(mockUser);

        User loadedUser = userService.loadUserByUsername(username);

        assertNotNull(loadedUser);
        assertEquals(username, loadedUser.getUserName());
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        String username = "nonexistent_user";
        when(userRepository.findByUserName(username)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> userService.loadUserByUsername(username));
    }

    @Test
    void testAuthenticateUser_ValidCredentials() throws Exception {
        String username = "user";
        String password = "password";
        User mockUser = new User();
        mockUser.setUserName(username);
        mockUser.setPassword(password);

        when(userRepository.findByUserName(username)).thenReturn(mockUser);

        String token = userService.authenticateUser(username, password);

        assertNotNull(token);
        assertEquals("jwt_token", token);
    }

    @Test
    void testAuthenticateUser_InvalidCredentials() {
        String username = "user";
        String password = "invalid_password";
        User mockUser = new User();
        mockUser.setUserName(username);
        mockUser.setPassword("password");

        when(userRepository.findByUserName(username)).thenReturn(mockUser);

        assertThrows(NotFoundException.class, () -> userService.authenticateUser(username, password));
    }
}

