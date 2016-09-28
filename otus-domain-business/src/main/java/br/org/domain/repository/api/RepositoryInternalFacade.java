package br.org.domain.repository.api;

import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.RepositoryConnectionNotFound;
import br.org.domain.exception.bussiness.RepositoryOfflineException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.user.User;

import javax.inject.Inject;

public class RepositoryInternalFacade {
    @Inject
    private RepositoryService repositoryService;

    public void createTo(User user) throws RepositoryConnectionNotFound, RepositoryOfflineException, AlreadyExistException, ValidationException {
        repositoryService.createTo(user);
    }
}
