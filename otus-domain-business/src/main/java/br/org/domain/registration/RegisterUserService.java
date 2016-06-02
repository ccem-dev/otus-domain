package br.org.domain.registration;

import br.org.domain.rest.dtos.UserDto;
import br.org.domain.exception.FillUserException;

public interface RegisterUserService {

	void createUser(UserDto userDto) throws FillUserException;
}
