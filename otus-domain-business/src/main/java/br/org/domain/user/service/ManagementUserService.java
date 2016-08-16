package br.org.domain.user.service;

import br.org.domain.exception.DataNotFoundException;
import br.org.domain.user.User;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.dto.ManagementUserDto;

import java.util.List;

public interface ManagementUserService {
    List<ManagementUserDto> fetchUsers();

    CurrentUserDto fetchUserByToken(String token) throws DataNotFoundException;

    User fetchUserByEmail(String email) throws DataNotFoundException;

    void disableUsers(ManagementUserDto managementUserDto);

    void enableUsers(ManagementUserDto managementUserDto);
}
