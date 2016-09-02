package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class NotFound extends ResponseInfo {

    public NotFound() {
        super(Response.Status.NOT_FOUND, "Not Found");
    }

    public static ResponseInfo build() {
        return new NotFound();
    }
}

