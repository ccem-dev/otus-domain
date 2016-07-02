package br.org.domain.security;

import br.org.domain.rest.Response;
import br.org.domain.exception.EmailNotFoundException;
import br.org.domain.exception.InvalidPasswordException;
import br.org.domain.exception.TokenException;
import br.org.domain.exception.UserDisabledException;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.security.services.SecurityService;
import com.google.gson.Gson;

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
    private SecurityService securityService;
    @Inject
    private HttpSession httpSession;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(String data, @Context HttpServletRequest request) {
        Gson gson = new Gson();
        AuthenticationDto authenticationDto = gson.fromJson(data, AuthenticationDto.class);
        authenticationDto.encryptPassword();
        authenticationDto.setIssuer(request.getRequestURL().toString());

        Response response = new Response();
        try {
            String jwt = securityService.authenticate(authenticationDto);
            response.setData(jwt);

            return response.buildSuccess().toJson();

        } catch (InvalidPasswordException | EmailNotFoundException | UserDisabledException | TokenException e) {
            return response.buildError(e).toJson();
        }
    }

    @POST
    @Path("/invalidate")
    public void invalidate(@Context HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        securityService.invalidate(token);
    }
}
