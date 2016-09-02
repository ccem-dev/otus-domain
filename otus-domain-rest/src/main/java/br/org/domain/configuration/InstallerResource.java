package br.org.domain.configuration;

import br.org.domain.configuration.api.SystemConfigFacade;
import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.rest.Response;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/installer")
public class InstallerResource {

    @Inject
    private SystemConfigFacade systemConfigFacade;

    @GET
    @Path("/ready")
    @Produces(MediaType.APPLICATION_JSON)
    public String ready() {
        return new Response().setData(systemConfigFacade.isReady()).toJson();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(SystemConfigDto systemConfigDto) {
        systemConfigDto.encrypt();
        systemConfigFacade.create(systemConfigDto);
        return new Response().buildSuccess().toJson();
    }

    @POST
    @Path("/validation/email")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String validation(EmailSenderDto emailSenderDto) {
        emailSenderDto.encrypt();
        return new Response().buildSuccess(systemConfigFacade.validateEmailService(emailSenderDto)).toJson();
    }
}
