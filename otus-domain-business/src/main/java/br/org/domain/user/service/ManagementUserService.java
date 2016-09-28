package br.org.domain.user.service;

import br.org.domain.exception.bussiness.*;
import br.org.domain.user.User;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.dto.ManagementUserDto;

import java.util.List;

public interface ManagementUserService {
    List<ManagementUserDto> list();

    void disable(String email) throws EmailNotificationException, DataNotFoundException;

    void enable(String email) throws EmailNotificationException, DataNotFoundException, RepositoryConnectionNotFound, RepositoryOfflineException, AlreadyExistException, ValidationException;

    User fetchUserByEmail(String email) throws DataNotFoundException;

    CurrentUserDto fetchCurrentUser(String token) throws DataNotFoundException;

    Boolean isUnique(String email);
}
