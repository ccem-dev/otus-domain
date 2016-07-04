package br.org.domain.projects;

import br.org.domain.exception.ConvertedDtoException;
import br.org.domain.projects.dto.ProjectDto;
import br.org.domain.rest.Response;
import br.org.domain.security.Secured;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("/otus")
public class OtusProjectResource {
	
	@Inject
	private ProjectService projectService;

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String register(ProjectDto projectDto) {
		Response response = new Response();
		
		try{
			projectService.register(projectDto);
			return response.buildSuccess().toJson();
			
		}catch (ConvertedDtoException e){
			return response.buildError(e).toJson();
		}
	}

	@GET
	@Secured
	@Produces(MediaType.APPLICATION_JSON)
	public String fetch(){
		Response response = new Response();
		List<ProjectDto> projects = projectService.fetchAll();
		return response.setData(projects).toJson();
	}
}
