package com.task.taskmanager.intercepter;

import com.task.taskmanager.entity.User;
import com.task.taskmanager.service.impl.UserServiceImpl;
import com.task.taskmanager.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserServiceImpl userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (Exception e) {
                e.printStackTrace();
                //TODO: Handle token validation errors
            }
        }

        if (username != null) {
            User user = new User();
            try {
                user = userService.loadUserByUsername(username);
            } catch (Exception ex) {
                ex.printStackTrace();
                //TODO: Handle exception
            }

            if (jwtTokenUtil.validateToken(jwtToken, user)) {
                //TODO: Set user Permissions
            }
        }
        filterChain.doFilter(request, response);
    }
}

