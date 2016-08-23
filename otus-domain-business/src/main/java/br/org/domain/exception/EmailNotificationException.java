package br.org.domain.exception;

public class EmailNotificationException extends Exception implements ResponseError {
	public EmailNotificationException(Throwable cause) {
		super(cause);
	}

	@Override
	public Object getObjectError() {
		return new ErrorData();
	}

	class ErrorData{
		private String message = "Email Notification Error";
		private ErrorType errorType = ErrorType.EMAIL_NOTIFICATION_ERROR;
	}
}
