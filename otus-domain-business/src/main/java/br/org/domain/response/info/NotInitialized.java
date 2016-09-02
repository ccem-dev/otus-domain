package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class NotInitialized extends ResponseInfo {

    public NotInitialized() {
        super(Response.Status.NOT_FOUND, "System Not Initialized");
    }

    public static ResponseInfo build() {
        return new NotInitialized();
    }
}

