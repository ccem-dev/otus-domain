package br.org.domain.rest.close;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.org.domain.rest.Response;
import com.google.gson.Gson;

import br.org.domain.exception.RepositoryNotFoundException;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.repository.dto.RepositoryConnectionData;
import br.org.domain.repository.dto.RepositoryDto;

@Path("repository")
public class RepositoryResource {

    @Inject
    private RepositoryService repositoryService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<RepositoryDto> getAll() {
        List<RepositoryDto> repositories = new ArrayList<RepositoryDto>();
        try {
            repositories = repositoryService.fetchAll();
        } catch (RepositoryNotFoundException e) {
        }

        return repositories;
    }

    @POST
    @Path("validate/connection")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getConnectionStatus(String repository) {
        RepositoryConnectionData repositoryConnectionData = new Gson().fromJson(repository, RepositoryConnectionData.class);
        Response response = new Response();

        response.setData(repositoryService.validationConnection(repositoryConnectionData));
        return response.toJson();
    }

    @POST
    @Path("validate/credentials")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String isValidRepositoryCredentials(String repository) {
        RepositoryConnectionData repositoryConnectionData = new Gson().fromJson(repository, RepositoryConnectionData.class);
        Response response = new Response();
        repositoryConnectionData.encrypt();
        response.setData(repositoryService.checkRepositoryCredentials(repositoryConnectionData));

        return response.toJson();
    }

    @GET
    @Path("validate/database")
    @Produces(MediaType.APPLICATION_JSON)
    public String existDatabase(String repository) {
        Response response = new Response();
        RepositoryDto repositoryDto = new Gson().fromJson(repository, RepositoryDto.class);

        response.setData(repositoryService.existsDatabase(repositoryDto));
        return response.toJson();
    }

    @GET
    @Path("/get")
    @Produces(MediaType.APPLICATION_JSON)
    public String existRepository(@QueryParam("repositoryName") String repositoryName) {
        Response response = new Response();
        List<RepositoryDto> repositories;

        try {
            repositories = repositoryService.fetchRepository(repositoryName);
            response.setData(repositories);

        } catch (RepositoryNotFoundException e) {
            response.setError(e);
        }

        return response.toJson();
    }

    @POST
    @Path("/connect")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String connect(String repository) {
        Response response = new Response();
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);

        try {
            repositoryService.persist(convertedRepositoryDto);
            response.setData(Boolean.TRUE);

        } catch (Exception e) {
            response.setError(e);
        }

        return response.toJson();
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(String repository) {
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);
        Response response = new Response();

        try {
            repositoryService.create(convertedRepositoryDto);
            response.setData(Boolean.TRUE);

        } catch (Exception e) {
            response.setError(e);
        }

        return response.toJson();
    }
}
