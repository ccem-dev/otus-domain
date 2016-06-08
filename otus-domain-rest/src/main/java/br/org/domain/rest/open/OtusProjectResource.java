package br.org.domain.rest.open;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.domain.rest.Response;
import br.org.domain.projects.OtusManagementService;
import br.org.domain.projects.OtusProjectDto;

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
