package br.org.domain.response.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class HttpResponseExceptionMapper implements ExceptionMapper<HttpResponseException> {

    @Override
    public Response toResponse(HttpResponseException e) {
        return e.getResponseInfo().toResponse();
    }
}

