package br.org.studio.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import br.org.studio.configuration.SystemConfigService;
import br.org.studio.exception.EmailNotificationException;
import br.org.studio.rest.dtos.SystemConfigDto;

@Path("/system")
public class SystemConfigResource {

	@Inject
	private SystemConfigService systemConfigService;

    @GET
    @Path("/config/ready")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String systemConfigReady(){
        Response response = new Response();
        response.setData(systemConfigService.isReady());
        return response.toJson();
    }

	@POST
	@Path("/config")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String systemConfig(String systemConfigJSon) {
		SystemConfigDto systemConfigDto = new Gson().fromJson(systemConfigJSon, SystemConfigDto.class);

		try {
			systemConfigDto.getUserDto().encrypt();
			systemConfigService.createInitialSystemConfig(systemConfigDto);
			return new Gson().toJson(Boolean.TRUE);

		} catch (Exception e) {
			return new Gson().toJson(Boolean.FALSE);
		}
	}

    @POST
    @Path("/validation/emailService")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String validateEmailService(String systemConfigJSon){
        SystemConfigDto systemConfigDto = new Gson().fromJson(systemConfigJSon, SystemConfigDto.class);
        Response response = new Response();

        try {
            systemConfigService.verifyEmailService(systemConfigDto.getEmailSenderDto());
            response.setData(Boolean.TRUE);

        } catch (EmailNotificationException e) {
            response.setData(Boolean.FALSE);
        }

        return response.toJson();
    }
}
