package br.org.domain.configuration.api;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.configuration.service.SystemConfigService;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.response.builder.ResponseBuilder;
import br.org.domain.response.exception.HttpResponseException;

import javax.inject.Inject;

public class SystemConfigFacade {

    @Inject
    private SystemConfigService systemConfigService;

    public RepositoryConnectionDataDto fetchRepositoryConnectionData() {
        try {
            return systemConfigService.fetchRepositoryConnectionData();

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuilder.System.NotInitialized.build());
        }
    }

    public Boolean isReady() {
        return systemConfigService.isReady();
    }

    public Boolean validateEmailService(EmailSenderDto emailSenderDto) {
        return systemConfigService.validateEmailService(emailSenderDto);
    }

    public void create(SystemConfigDto systemConfigDto) {
        try {
            systemConfigService.create(systemConfigDto);

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());

        } catch (EmailNotificationException e) {
            throw new HttpResponseException(ResponseBuilder.Email.HttpCommunication.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuilder.Common.AlreadyExist.build());
        }
    }
}
