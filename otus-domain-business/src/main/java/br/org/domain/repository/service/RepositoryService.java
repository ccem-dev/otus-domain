package br.org.domain.repository.service;

import java.sql.SQLException;
import java.util.List;

import br.org.domain.user.User;
import br.org.domain.exception.RepositoryNotFoundException;
import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.repository.dto.RepositoryConnectionData;
import br.org.domain.exception.RepositoryAlreadyExistException;
import br.org.domain.exception.RepositoryOfflineException;
import br.org.domain.repository.dto.RepositoryDto;

public interface RepositoryService {
    List<RepositoryDto> fetchRepository(String name) throws RepositoryNotFoundException;

    List<RepositoryDto> fetchAll() throws RepositoryNotFoundException;

    void persist(RepositoryDto repositoryDto);

    void create(RepositoryDto repositoryDto) throws RepositoryOfflineException, SQLException, RepositoryAlreadyExistException;

    Boolean existsDatabase(RepositoryDto repositoryDto);

    Boolean validationConnection(RepositoryConnectionData repositoryConnectionData);

	Boolean checkRepositoryCredentials(RepositoryConnectionData repositoryConnectionData);

	void createRepositoryTo(User user);

	void createAdminRepository(User admin, SystemConfigDto systemConfigDto);

}
