package br.org.domain.exception;

public class EmailNotFoundException extends Exception implements ResponseError{

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Email Not Found";
        private ErrorType errorType = ErrorType.EMAIL_NOT_FOUND;
    }
}
