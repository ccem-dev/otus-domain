package br.org.domain.projects;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("project")
public class ProjectResource {

    @Inject
    private ProjectService projectService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Object> getAll(){

        projectService.fetchAll();
        return new ArrayList<>();
    }
}
