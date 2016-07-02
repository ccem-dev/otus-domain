package br.org.domain.exception;

public class UserDisabledException extends Exception implements ResponseError{

    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "User Disabled";
        private ErrorType errorType = ErrorType.USER_DISABLED;
    }
}
