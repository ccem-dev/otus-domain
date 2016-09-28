package br.org.domain.repository.api;

import br.org.domain.exception.bussiness.*;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.response.builder.ResponseBuilder;
import br.org.domain.response.exception.HttpResponseException;
import br.org.domain.user.User;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

public class RepositoryFacade {
    @Inject
    private RepositoryService repositoryService;

    public List<RepositoryDto> fetch(String name) {
        try {
            return repositoryService.fetch(name);

        } catch (DataNotFoundException e) {
            return new ArrayList<>();
        }
    }

    public List<RepositoryDto> list() {
        return repositoryService.list();
    }

    public Boolean has(User user) {
        return repositoryService.has(user);
    }

    public Boolean validateConnection(RepositoryConnectionDataDto repositoryConnectionDataDto) {
        try {
            return repositoryService.validateConnection(repositoryConnectionDataDto);

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());
        }
    }

    public Boolean validateCredentials(RepositoryConnectionDataDto repositoryConnectionDataDto) {
        try {
            return repositoryService.validateCredentials(repositoryConnectionDataDto);

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());
        }
    }

    public void createTo(User user) {
        try {
            repositoryService.createTo(user);

        } catch (RepositoryOfflineException e) {
            throw new HttpResponseException(ResponseBuilder.Database.DatabaseCommunication.build());

        } catch (AlreadyExistException e) {
            throw new HttpResponseException(ResponseBuilder.Common.AlreadyExist.build());

        } catch (RepositoryConnectionNotFound repositoryConnectionNotFound) {
            throw new HttpResponseException(ResponseBuilder.System.NotInitialized.build());

        } catch (ValidationException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Validation.build());
        }
    }
}
