package com.adbms.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CheckoutResponse {
    private boolean success; // This becomes result.success in JS
    private String message;  // This becomes result.message in JS

    public boolean isSuccess() {
        return success;
    }
    public String getMessage() {
        return message;
    }

    public CheckoutResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    public CheckoutResponse() {
    }
}