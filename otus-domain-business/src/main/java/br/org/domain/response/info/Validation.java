package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class Validation extends ResponseInfo {

    public Validation() {
        super(Response.Status.BAD_REQUEST, "Validation Fail");
    }

    public static ResponseInfo build(){
        return new Validation();
    }
}
