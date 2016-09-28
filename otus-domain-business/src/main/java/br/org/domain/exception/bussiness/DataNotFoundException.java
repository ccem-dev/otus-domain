package br.org.domain.exception.bussiness;

import java.text.ParseException;

public class DataNotFoundException extends Exception{
    public DataNotFoundException() {
    }

    public DataNotFoundException(ParseException e) {
        super(e);
    }
}
