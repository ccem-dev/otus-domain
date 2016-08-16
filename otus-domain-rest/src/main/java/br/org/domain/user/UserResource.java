package br.org.domain.user;

import br.org.domain.email.validation.EmailConstraint;
import br.org.domain.exception.InvalidDtoException;
import br.org.domain.rest.Response;
import br.org.domain.security.Secured;
import br.org.domain.security.services.SecurityContextService;
import br.org.domain.user.dto.ManagementUserDto;
import br.org.domain.user.dto.UserDto;
import br.org.domain.user.registration.RegisterUserService;
import br.org.domain.user.service.ManagementUserService;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

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
    private ManagementUserService managementUserService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(UserDto userDto) {
        Response response = new Response();
        try {
            userDto.encrypt();

            registerUserService.createUser(userDto);
            return response.buildSuccess().toJson();

        } catch (InvalidDtoException e) {
            return response.buildError(e).toJson();
        }
    }

    @GET
    @Path("/exists")
    @Produces(MediaType.APPLICATION_JSON)
    public String userEmailExists(@QueryParam("email") String email) {
        Boolean result = emailConstraint.isUnique(email);
        Response response = new Response();
        return response.buildSuccess(!result).toJson();
    }

    @GET
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String getUsers() {
        List<ManagementUserDto> managementUserDtos = managementUserService.fetchUsers();
        Response response = new Response();
        return response.buildSuccess(managementUserDtos).toJson();
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured
    public String disableUsers(ManagementUserDto managementUserDto) {
        managementUserService.disableUsers(managementUserDto);
        Response response = new Response();

        return response.buildSuccess().toJson();

    }

    @POST
    @Path("/enable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured
    public String enableUsers(ManagementUserDto managementUserDto) {
        managementUserService.enableUsers(managementUserDto);
        Response response = new Response();

        return response.buildSuccess().toJson();
    }

    @GET
    @Path("/fetch/current")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String getCurrentUser() {
        List<ManagementUserDto> managementUserDtos = managementUserService.fetchUsers();
        Response response = new Response();
        return response.buildSuccess(managementUserDtos).toJson();
    }

}
