package br.org.studio.rest;

import java.lang.reflect.Type;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import br.org.studio.administration.AdministrationUserService;
import br.org.studio.repository.RepositoryService;
import br.org.studio.rest.dtos.UserDto;
import br.org.studio.rest.dtos.administration.AdministrationUser;

@Path("/administration/users")
public class AdministrationUsersResource {

    @Inject
    private AdministrationUserService administrationUserService;
    
    @Inject
    private RepositoryService repositoryService;

    @GET
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        AdministrationUser administrationUser = administrationUserService.fetchUsers();
        return new Gson().toJson(administrationUser);
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String disableUsers(String users) {
        Type collectionType = new TypeToken<List<UserDto>>(){}.getType();
        List<UserDto> convertedUsers = new Gson().fromJson(users, collectionType);

        administrationUserService.disableUsers(convertedUsers);
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
       
    }

    @POST
    @Path("/enable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String enableUsers(String users) {
        Type collectionType = new TypeToken<List<UserDto>>(){}.getType();
        List<UserDto> convertedUsers = new Gson().fromJson(users, collectionType);

        administrationUserService.enableUsers(convertedUsers);
        repositoryService.createRepositoryForUsers(convertedUsers);
        	
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
    }
}
