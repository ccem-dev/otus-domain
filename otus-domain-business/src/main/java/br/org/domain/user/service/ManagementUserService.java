package br.org.domain.user.service;

import br.org.domain.exception.bussiness.*;
import br.org.domain.user.dto.ManagementUserDto;

import java.util.List;

public interface ManagementUserService {
    List<ManagementUserDto> list();

    void disable(String email) throws EmailNotificationException, DataNotFoundException;

    void enable(String email) throws EmailNotificationException, DataNotFoundException, RepositoryConnectionNotFound, RepositoryOfflineException, AlreadyExistException, ValidationException;

    Boolean isUnique(String email);
}
