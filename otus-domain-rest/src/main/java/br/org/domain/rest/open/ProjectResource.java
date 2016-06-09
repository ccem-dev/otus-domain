package br.org.domain.rest.open;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import br.org.domain.rest.Response;
import br.org.domain.projects.ProjectService;
import br.org.domain.projects.ProjectDto;

import br.org.domain.security.Secured;
import com.google.gson.Gson;

import java.util.List;


@Path("/otus")
public class ProjectResource {
	
	@Inject
	private ProjectService projectService;

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String register(String projectData) {
		Response response = new Response();
		
		try{
			ProjectDto projectDto = new Gson().fromJson(projectData, ProjectDto.class);
			projectService.register(projectDto);
			
			return response.setData(Boolean.TRUE).toJson();	
		}catch (Exception e){
			return response.setHasErrors(Boolean.TRUE).toJson();
		}
	}

	@GET
	@Secured
	@Produces(MediaType.APPLICATION_JSON)
	public List<ProjectDto> fetch(){
		List<ProjectDto> projects = projectService.fetchAll();
		return projects;
	}
}
