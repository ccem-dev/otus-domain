package br.org.domain.user.api;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.exception.bussiness.*;
import br.org.domain.response.builder.ResponseBuilder;
import br.org.domain.response.exception.HttpResponseException;
import br.org.domain.user.dto.ManagementUserDto;
import br.org.domain.user.dto.UserDto;
import br.org.domain.user.registration.SignupUserService;
import br.org.domain.user.service.ManagementUserService;

import javax.inject.Inject;
import java.util.List;

public class UserFacade {
    @Inject
    private SignupUserService signupUserService;

    @Inject
    private ManagementUserService managementUserService;

    public void create(UserDto userDto) {
        try {
            signupUserService.create(userDto);

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuilder.Common.AlreadyExist.build());

        } catch (EmailNotificationException e) {
            throw new HttpResponseException(ResponseBuilder.Email.HttpCommunication.build());
        }
    }

    public List<ManagementUserDto> list() {
        return managementUserService.list();
    }

    public void disable(String email) {
        try {
            managementUserService.disable(email);

        } catch (EmailNotificationException e) {
            throw new HttpResponseException(ResponseBuilder.Email.HttpCommunication.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuilder.Common.NotFound.build());
        }
    }

    public void enable(String email) {
        try {
            managementUserService.enable(email);

        } catch (EmailNotificationException e) {
            throw new HttpResponseException(ResponseBuilder.Email.HttpCommunication.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuilder.Common.NotFound.build());

        } catch (RepositoryConnectionNotFound repositoryConnectionNotFound) {
            throw new HttpResponseException(ResponseBuilder.System.NotInitialized.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuilder.Common.AlreadyExist.build());

        } catch (RepositoryOfflineException e) {
            throw new HttpResponseException(ResponseBuilder.Database.DatabaseCommunication.build());
        }
    }

    public void create(SystemConfigDto systemConfigDto) {
        try {
            signupUserService.createAdmin(systemConfigDto.getUser());
        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuilder.Common.AlreadyExist.build());
        }
    }
}
