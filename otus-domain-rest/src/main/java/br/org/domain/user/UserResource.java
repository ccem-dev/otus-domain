package br.org.domain.user;

import br.org.domain.email.validation.EmailConstraint;
import br.org.domain.rest.Response;
import br.org.domain.security.Secured;
import br.org.domain.security.TokenParser;
import br.org.domain.user.api.UserFacade;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.dto.ManagementUserDto;
import br.org.domain.user.dto.UserDto;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/user")
public class UserResource {

    @Inject
    private UserFacade userFacade;

    @Inject
    private EmailConstraint emailConstraint;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(UserDto userDto) {
        userDto.encrypt();
        userFacade.create(userDto);
        return new Response().buildSuccess().toJson();
    }

    @GET
    @Path("/exist")
    @Produces(MediaType.APPLICATION_JSON)
    public String userEmailExists(@QueryParam("email") String email) {
        Boolean result = emailConstraint.isUnique(email);
        return new Response().buildSuccess(!result).toJson();
    }

    @GET
    @Secured
    @Path("/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
        List<ManagementUserDto> managementUserDtos = userFacade.list();
        return new Response().buildSuccess(managementUserDtos).toJson();
    }

    @POST
    @Secured
    @Path("/disable")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String disableUsers(ManagementUserDto managementUserDto) {
        userFacade.disable(managementUserDto.getEmail());
        return new Response().buildSuccess().toJson();
    }

    @POST
    @Secured
    @Path("/enable")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String enableUsers(ManagementUserDto managementUserDto) {
        userFacade.enable(managementUserDto.getEmail());
        return new Response().buildSuccess().toJson();
    }

    @GET
    @Path("/fetch/current")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public String getCurrentUser(@Context HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = TokenParser.parse(authorizationHeader);
        CurrentUserDto currentUserDto = userFacade.fetchLoggedUser(token);
        return new Response().buildSuccess(currentUserDto).toJson();
    }
}
