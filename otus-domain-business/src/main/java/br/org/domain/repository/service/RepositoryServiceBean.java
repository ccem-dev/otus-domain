package br.org.domain.repository.service;

import br.org.domain.configuration.api.SystemConfigFacade;
import br.org.domain.exception.bussiness.*;
import br.org.domain.repository.Repository;
import br.org.domain.repository.builder.RepositoryBuilder;
import br.org.domain.repository.dao.RepositoryDao;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.user.User;
import br.org.domain.user.api.UserFacade;
import br.org.studio.tool.RepositoryManagerFacade;
import br.org.studio.tool.base.repository.configuration.RepositoryConfiguration;
import br.org.studio.tool.mongodb.database.MongoConnector;
import br.org.studio.tool.mongodb.repository.MongoRepositoryConfiguration;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class RepositoryServiceBean implements RepositoryService {

    @Inject
    private RepositoryDao repositoryDao;

    @Inject
    private SystemConfigFacade systemConfigFacade;

    @Inject
    private UserFacade userFacade;

    private RepositoryManagerFacade repositoryManagerFacade;

    public RepositoryServiceBean() {
        repositoryManagerFacade = new RepositoryManagerFacade();
    }

    @Override
    public List<RepositoryDto> fetch(String name) throws DataNotFoundException {
        try {
            List<Repository> repositories = repositoryDao.fetch(name);
            return RepositoryBuilder.build(repositories);

        } catch (NoResultException e) {
            throw new DataNotFoundException();
        }
    }

    @Override
    public List<RepositoryDto> list() {
        try {
            List<Repository> repositories = repositoryDao.fetchAll();
            return RepositoryBuilder.build(repositories);

        } catch (NoResultException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public Boolean validateConnection(RepositoryConnectionDataDto repositoryConnectionDataDto) throws ValidationException {
        try {
            if (repositoryConnectionDataDto.isValid()) {
                RepositoryDto repositoryDto = new RepositoryDto(repositoryConnectionDataDto);
                RepositoryConfiguration repositoryConfiguration = MongoRepositoryConfiguration.create(repositoryDto);
                return repositoryManagerFacade.isRepositoryAccessible(repositoryConfiguration);

            } else {
                throw new ValidationException();
            }
        } catch (IllegalArgumentException e) {
            return Boolean.FALSE;
        }
    }

    @Override
    public Boolean validateCredentials(RepositoryConnectionDataDto repositoryConnectionDataDto) throws ValidationException {
        if (repositoryConnectionDataDto.isValid()) {
            return MongoConnector.getConnector(repositoryConnectionDataDto.getHost(), repositoryConnectionDataDto.getPort())
                    .isValidCredentials(repositoryConnectionDataDto.getUsername(), repositoryConnectionDataDto.getDatabase(), repositoryConnectionDataDto.getPassword());
        } else {
            throw new ValidationException();
        }
    }

    @Override
    public void createTo(User user) throws RepositoryOfflineException, RepositoryConnectionNotFound, ValidationException, AlreadyExistException {
        if (!has(user)) {
            RepositoryConnectionDataDto repositoryConnectionDataDto = fetchConnectionData();
            RepositoryDto repositoryDto = RepositoryBuilder.build(repositoryConnectionDataDto, user);

            if (validateConnection(repositoryConnectionDataDto) && validateCredentials(repositoryConnectionDataDto)) {
                create(repositoryDto, user);
            } else {
                throw new RepositoryOfflineException();
            }
        } else {
            throw new AlreadyExistException();
        }
    }

    private void create(RepositoryDto repositoryDto, User user) {
        RepositoryConfiguration repositoryConfiguration = MongoRepositoryConfiguration.create(repositoryDto);
        repositoryManagerFacade.createRepository(repositoryConfiguration);

        repositoryDto.encrypt();
        Repository repository = RepositoryBuilder.build(repositoryDto, user);
        repositoryDao.persist(repository);
    }

    private RepositoryConnectionDataDto fetchConnectionData() {
        RepositoryConnectionDataDto repositoryConnectionDataDto = systemConfigFacade.fetchRepositoryConnectionData();
        repositoryConnectionDataDto.decrypt();
        return repositoryConnectionDataDto;
    }

    @Override
    public Boolean has(User user) {
        return repositoryDao.userHasRepository(user);
    }
}
