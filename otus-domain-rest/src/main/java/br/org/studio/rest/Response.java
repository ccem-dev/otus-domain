package br.org.studio.rest;

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

	public boolean hasErrors() {
		return hasErrors;
	}

	public Response setHasErrors(boolean hasErrors) {
		this.hasErrors = hasErrors;
		return this;
	}
}
