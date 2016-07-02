package br.org.domain.user.registration;

import br.org.domain.exception.InvalidDtoException;
import br.org.domain.user.dto.UserDto;

public interface RegisterUserService {

	void createUser(UserDto userDto) throws InvalidDtoException;
}
