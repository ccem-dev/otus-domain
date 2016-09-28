package br.org.domain.projects;

import br.org.domain.projects.api.ProjectFacade;
import br.org.domain.projects.dto.ProjectDto;
import br.org.domain.rest.Response;
import br.org.domain.security.Secured;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("/otus")
public class ProjectResource {

    @Inject
    private ProjectFacade projectFacade;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String register(ProjectDto projectDto) {
        projectFacade.register(projectDto);
        return new Response().buildSuccess().toJson();
    }

    @GET
    @Secured
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
        Response response = new Response();
        List<ProjectDto> projects = projectFacade.list();
        return response.setData(projects).toJson();
    }
}
