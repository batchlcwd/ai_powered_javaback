package com.mybasket.app.dto;

public record ValidationErrorResponse(
        String field,
        String message
) {
}
