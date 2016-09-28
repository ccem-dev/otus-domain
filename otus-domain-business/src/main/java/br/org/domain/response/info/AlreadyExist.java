package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class AlreadyExist extends ResponseInfo {
    public AlreadyExist(){
        super(Response.Status.CONFLICT, "Already Exist");
    }

    public static ResponseInfo build() {
        return new AlreadyExist();
    }
}
