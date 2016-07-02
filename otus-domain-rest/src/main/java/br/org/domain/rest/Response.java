package br.org.domain.rest;

import br.org.domain.exception.ResponseError;
import com.google.gson.Gson;

public class Response {
    private Object data;
    private Object error;
    private Boolean hasErrors = Boolean.FALSE;

    public Object getData() {
        return data;
    }

    public Response setData(Object data) {
        this.data = data;
        return this;
    }

    public Response setError(Object error) {
        this.error = error;
        return this;
    }

    public Object getError() {
        return error;
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public Response buildError(ResponseError data) {
        this.hasErrors = Boolean.TRUE;
        this.data = data.getObjectError();
        return this;
    }

    public Response buildSuccess(Object data) {
        this.data = data;
        return this;
    }

    public Response buildSuccess() {
        return this;
    }

}
