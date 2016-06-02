package br.org.domain.administration;

import br.org.domain.rest.dtos.UserDto;
import br.org.domain.rest.dtos.administration.AdministrationUser;

import java.util.List;

/**
 * Created by diogoferreira on 29/10/15.
 */
public interface AdministrationUserService {
    AdministrationUser fetchUsers();

    void disableUsers(List<UserDto> users);

    void enableUsers(List<UserDto> users);
}
