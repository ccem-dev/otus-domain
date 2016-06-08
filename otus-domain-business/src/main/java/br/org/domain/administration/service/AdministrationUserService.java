package br.org.domain.administration.service;

import br.org.domain.administration.dto.UserDto;
import br.org.domain.administration.dto.AdministrationUser;

import java.util.List;

/**
 * Created by diogoferreira on 29/10/15.
 */
public interface AdministrationUserService {
    AdministrationUser fetchUsers();

    void disableUsers(List<UserDto> users);

    void enableUsers(List<UserDto> users);
}
