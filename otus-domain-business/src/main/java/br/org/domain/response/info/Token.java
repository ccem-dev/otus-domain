package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class Token extends ResponseInfo{

    public Token() {
        super(Response.Status.UNAUTHORIZED, "Build Token Error");
    }

    public static ResponseInfo build(){
        return new Token();
    }
}
