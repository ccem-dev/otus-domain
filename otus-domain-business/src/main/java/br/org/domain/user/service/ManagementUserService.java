package br.org.domain.user.service;

import br.org.domain.user.dto.ManagementUserDto;

import java.util.List;

public interface ManagementUserService {
    List<ManagementUserDto> fetchUsers();

    void disableUsers(ManagementUserDto managementUserDto);

    void enableUsers(ManagementUserDto managementUserDto);
}
