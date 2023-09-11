package com.task.taskmanager.bean;

public class ApiResponse {

    private String token;

    private boolean success;

    private String message;

    public ApiResponse(String token, boolean success, String message) {
        this.token = token;
        this.success = success;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
