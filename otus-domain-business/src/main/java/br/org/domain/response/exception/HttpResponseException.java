package br.org.domain.response.exception;

public class HttpResponseException extends RuntimeException{
    private ResponseInfo responseInfo;

    public HttpResponseException(ResponseInfo responseInfo) {
        this.responseInfo = responseInfo;
    }

    public ResponseInfo getResponseInfo() {
        return responseInfo;
    }
}

