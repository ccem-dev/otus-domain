package br.org.domain.rest.close;

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

import br.org.domain.rest.Response;
import br.org.domain.security.Secured;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import br.org.domain.administration.AdministrationUserService;
import br.org.domain.security.services.SecurityContextService;
import br.org.domain.exception.FillUserException;
import br.org.domain.messages.FillUserExceptionMessage;
import br.org.domain.registration.RegisterUserService;
import br.org.domain.rest.dtos.UserDto;
import br.org.domain.rest.dtos.administration.AdministrationUser;
import br.org.domain.validation.EmailConstraint;

@Path("/user")
public class UserResource {

    @Inject
    private RegisterUserService registerUserService;
    @Inject
    private EmailConstraint emailConstraint;
    @Inject
    private SecurityContextService securityContextService;
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
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
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
    @Secured
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
    @Secured
    public String enableUsers(String users) {
        Type collectionType = new TypeToken<List<UserDto>>(){}.getType();
        List<UserDto> convertedUsers = new Gson().fromJson(users, collectionType);

        administrationUserService.enableUsers(convertedUsers);
		
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
    }

}
