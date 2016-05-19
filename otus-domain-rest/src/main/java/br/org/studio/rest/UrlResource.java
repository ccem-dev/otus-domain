package br.org.studio.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("url")
public class UrlResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String isValidDomain() {
		Response response = new Response();
		response.setData(true);
		return response.toJson();
	}
}
