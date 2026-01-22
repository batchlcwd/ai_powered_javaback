package com.mybasket.app.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ImageUrlValidator implements ConstraintValidator<ValidImageUrl, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        //logic to validate:
        System.out.println("validating image url ");
        return value.toLowerCase().endsWith(".png") || value.toLowerCase().endsWith(".jpg");
    }
}
