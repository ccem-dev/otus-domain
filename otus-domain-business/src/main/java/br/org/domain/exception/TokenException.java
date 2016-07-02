package br.org.domain.exception;

public class TokenException extends Exception implements ResponseError{

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Token Exception";
        private ErrorType errorType = ErrorType.TOKEN_EXCEPTION;
    }
}
