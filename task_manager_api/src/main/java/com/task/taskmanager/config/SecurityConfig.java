package com.task.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // http.csrf().disable()
        // .authorizeRequests()
        // .antMatchers("/login").permitAll() // Allow access to login page
        // .anyRequest().authenticated()
        // .and()
        // .formLogin()
        // .loginPage("/login") // Set custom login page URL
        // .permitAll()
        // .and()
        // .logout()
        // .permitAll()
        // .and()
        // .exceptionHandling()
        // .authenticationEntryPoint(authenticationEntryPoint());
        http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
                .permitAll())
                .csrf(AbstractHttpConfigurer::disable);
    }

    @Bean
    public LoginUrlAuthenticationEntryPoint authenticationEntryPoint() {
        // Redirect to the login page when authentication fails
        return new LoginUrlAuthenticationEntryPoint("/login");
    }
}
