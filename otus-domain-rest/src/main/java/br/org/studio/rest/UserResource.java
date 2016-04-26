package br.org.studio.rest;

import java.lang.reflect.Type;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import br.org.studio.administration.AdministrationUserService;
import br.org.studio.context.ContextService;
import br.org.studio.exception.FillUserException;
import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.messages.FillUserExceptionMessage;
import br.org.studio.registration.RegisterUserService;
import br.org.studio.rest.dtos.UserDto;
import br.org.studio.rest.dtos.administration.AdministrationUser;
import br.org.studio.validation.EmailConstraint;

@Path("/user")
public class UserResource {

    @Inject
    private RegisterUserService registerUserService;
    @Inject
    private EmailConstraint emailConstraint;
    @Inject
    private ContextService contextService;
    @Inject
    private HttpSession httpSession;
    @Inject
    private AdministrationUserService administrationUserService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(String userJSon) {
        Gson gson = new Gson();

        try {
            UserDto userDto = gson.fromJson(userJSon, UserDto.class);
            userDto.encrypt();

            registerUserService.createUser(userDto);
            return gson.toJson(new FillUserExceptionMessage());

        } catch (FillUserException e) {
            return gson.toJson(new FillUserExceptionMessage());
        }
    }

    @GET
    @Path("/exists")
    @Produces(MediaType.APPLICATION_JSON)
    public String userEmailExists(@QueryParam("email") String email) {
        Boolean result = emailConstraint.isUnique(email);
        Response response = new Response();
        response.setData(!result);
        return response.toJson();
    }

    @GET
    @Path("/logged")
    @Produces(MediaType.APPLICATION_JSON)
    public String getLoggedUser() {
        UserDto loggedUser;
        Response response = new Response();

        try {
            loggedUser = contextService.getLoggedUser(httpSession);
            response.setData(loggedUser);
            return response.toJson();

        } catch (SessionNotFoundException e) {
            return response.toJson();
        }
    }

    @GET
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        AdministrationUser administrationUser = administrationUserService.fetchUsers();
        Response response = new Response();
        response.setData(administrationUser);
        return response.toJson();
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String disableUsers(String users) {
        Type collectionType = new TypeToken<List<UserDto>>() {
        }.getType();
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
		
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
    }

}
