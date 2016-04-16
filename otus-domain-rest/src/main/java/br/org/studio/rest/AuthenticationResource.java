package br.org.studio.rest;

import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityService;

import com.google.gson.Gson;

@Path("authentication")
public class AuthenticationResource {

    @Inject
    private SecurityService securityService;
    @Inject
    private HttpSession httpSession;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String authenticate(String data) {
        Gson gson = new Gson();

        LoginAuthenticationDto loginDto = gson.fromJson(data, LoginAuthenticationDto.class);
        loginDto.setHttpSession(httpSession);
        loginDto.encryptPassword();

        Response response = new Response();
        try {
            UUID userUUID = securityService.authenticate(loginDto);
            return response.setData(userUUID.toString()).toJson();
        } catch (Exception e) {
            response.setHasErrors(Boolean.TRUE);
            return response.setError(new String("Falha na autenticação.")).toJson();
        }
    }

    @DELETE
    public String invalidate() {
        System.out.println("Invalidate");
	    return "";
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String userLogin(String loginData) {
	Gson gson = new Gson();

	LoginAuthenticationDto loginDto = gson.fromJson(loginData, LoginAuthenticationDto.class);
	loginDto.setHttpSession(httpSession);
	loginDto.encryptPassword();
	
	Response response = new Response();
	try {
	    UUID userUUID = securityService.authenticate(loginDto);
	    return response.setData(userUUID.toString()).toJson();
	} catch (Exception e) {
		response.setHasErrors(Boolean.TRUE);
		return response.setError(new String("Falha na autenticação.")).toJson();            
	}
    }

    @Path("/logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String userLogout() {
	Response response = new Response();

	try {
	    securityService.logout(httpSession);
	    response.setData(Boolean.TRUE);
	} catch (Exception e) {
	    response.setData(Boolean.FALSE);
	}

	return response.toJson();

    }

    @Path("/isLogged")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String isLogged() {
	Response response = new Response();
	response.setData(securityService.isLogged(httpSession));

	return response.toJson();
    }
}
