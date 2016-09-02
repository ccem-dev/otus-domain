package br.org.domain.response.info;

import br.org.domain.response.exception.ResponseInfo;

import javax.ws.rs.core.Response;

public class DatabaseCommunication extends ResponseInfo{

    public DatabaseCommunication() {
        super(Response.Status.PRECONDITION_FAILED, "Database Comunication Fail");
    }

    public static ResponseInfo build() {
        return new DatabaseCommunication();
    }
}
