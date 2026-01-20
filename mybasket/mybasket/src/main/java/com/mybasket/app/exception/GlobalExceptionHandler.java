package com.mybasket.app.exception;

import com.mybasket.app.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
//ControllerAdvice+ ResponseBody
public class GlobalExceptionHandler
{


    //exception ko handle Marni hai :
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElement(NoSuchElementException ex){
        System.out.println("Exception are handled");
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND,404);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    //exception ko handle Marni hai :
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex){
        System.out.println("Exception are handled");
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND,404);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }



}
