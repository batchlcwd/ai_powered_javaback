package com.mybasket.app.exception;

import com.mybasket.app.dto.ErrorResponse;
import com.mybasket.app.dto.ValidationErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
//ControllerAdvice+ ResponseBody
public class GlobalExceptionHandler {


    //exception ko handle Marni hai :
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElement(NoSuchElementException ex) {
        System.out.println("Exception are handled");
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, 404);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    //exception ko handle Marni hai :
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        System.out.println("Exception are handled");
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, 404);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    //handling MethodArgumentNotValidException

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ValidationErrorResponse>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
//        FieldError fieldError = ex.getBindingResult().getFieldError();
//        var fieldName=fieldError.getField();
//        var fieldMessage=fieldError.getDefaultMessage();
        List<ValidationErrorResponse> fieldsErrorList = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> new ValidationErrorResponse(error.getField(), error.getDefaultMessage()))
                .toList();
        return new ResponseEntity<>(fieldsErrorList, HttpStatus.BAD_REQUEST);
    }


}
