package br.org.domain.repository;

import br.org.domain.repository.api.RepositoryFacade;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.rest.Response;
import br.org.domain.security.Secured;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/repository")
public class RepositoryResource {

    @Inject
    private RepositoryFacade repositoryFacade;

    @GET
    @Secured
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
        List<RepositoryDto> repositories = repositoryFacade.list();
        return new Response().setData(repositories).toJson();
    }

    @POST
    @Path("/validate/connection")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getConnectionStatus(RepositoryConnectionDataDto repositoryConnectionDataDto) {
        return new Response().setData(repositoryFacade.validateConnection(repositoryConnectionDataDto)).toJson();
    }

    @POST
    @Path("/validate/credentials")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String isValidRepositoryCredentials(RepositoryConnectionDataDto repositoryConnectionDataDto) {
        return new Response().buildSuccess(repositoryFacade.validateCredentials(repositoryConnectionDataDto)).toJson();
    }

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public String get(@QueryParam("name") String repositoryName) {
        return new Response().setData(repositoryFacade.fetch(repositoryName)).toJson();
    }
}
