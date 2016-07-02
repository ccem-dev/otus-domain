package br.org.domain.configuration;

import br.org.domain.rest.Response;
import br.org.domain.configuration.service.SystemConfigService;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.configuration.dto.SystemConfigDto;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/installer")
public class InstallerResource {

    @Inject
    private SystemConfigService systemConfigService;

    @GET
    @Path("/ready")
    @Produces(MediaType.APPLICATION_JSON)
    public String ready(){
        Response response = new Response();
        response.setData(systemConfigService.isReady());
        return response.toJson();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String config(String systemConfigJSon) {
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
    @Path("/validation")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String validation(String systemConfigJSon){
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
