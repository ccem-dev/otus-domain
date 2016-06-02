package br.org.studio.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.studio.otus.OtusManagementService;
import br.org.studio.rest.dtos.OtusProjectDto;

import com.google.gson.Gson;


@Path("/otus")
public class OtusProjectResource {
	
	@Inject
	private OtusManagementService otusManagementService;

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String register(String projectData) {
		Response response = new Response();
		
		try{
			OtusProjectDto otusProjectDto = new Gson().fromJson(projectData, OtusProjectDto.class);
			otusManagementService.register(otusProjectDto);
			
			return response.setData(Boolean.TRUE).toJson();	
		}catch (Exception e){
			return response.setHasErrors(Boolean.TRUE).toJson();
		}
		
	}
}
