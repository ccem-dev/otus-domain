package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class HttpCommunication extends ResponseInfo {

    public HttpCommunication() {
        super(Response.Status.PRECONDITION_FAILED, "Http Comunication Fail");
    }

    public static ResponseInfo build() {
        return new HttpCommunication();
    }
}
