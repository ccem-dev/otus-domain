package br.org.domain.repository.service;

import br.org.domain.exception.bussiness.*;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.user.User;

import java.util.List;

public interface RepositoryService {
    List<RepositoryDto> fetch(String name) throws DataNotFoundException;

    List<RepositoryDto> list();

    Boolean validateConnection(RepositoryConnectionDataDto repositoryConnectionDataDto) throws ValidationException;

	Boolean validateCredentials(RepositoryConnectionDataDto repositoryConnectionDataDto) throws ValidationException;

	void createTo(User user) throws RepositoryOfflineException, RepositoryConnectionNotFound, ValidationException, AlreadyExistException;

    Boolean has(User user);
}
