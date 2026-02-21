package com.substring.resume.analyzer.exceptions;

public class InvalidRequestException extends  RuntimeException{

    public  InvalidRequestException(String message){
        super(message);
    }

    public  InvalidRequestException(){
        super("Your request is invalid");
    }

}
