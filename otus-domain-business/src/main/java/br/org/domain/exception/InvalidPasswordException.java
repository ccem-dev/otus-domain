package br.org.domain.exception;

public class InvalidPasswordException extends Exception implements ResponseError{
    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Invalid Password";
        private ErrorType errorType = ErrorType.INVALID_PASSWORD;
    }

}
