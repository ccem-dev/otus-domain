package br.org.domain.security;

import br.org.domain.rest.Response;
import br.org.domain.security.api.SecurityFacade;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.user.dto.CurrentUserDto;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

@Path("/authentication")
public class AuthenticationResource {
    @Inject
    private SecurityFacade securityFacade;

    @Inject
    private HttpSession httpSession;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(AuthenticationDto authenticationDto, @Context HttpServletRequest request) {
        authenticationDto.encrypt();
        String issuer = request.getRequestURL().toString();
        CurrentUserDto currentUser = securityFacade.authenticate(authenticationDto, issuer);
        return new Response().buildSuccess(currentUser).toJson();
    }

    @POST
    @Path("/invalidate")
    public String invalidate(@Context HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        securityFacade.invalidateSession(token);
        return new Response().buildSuccess().toJson();
    }
}
