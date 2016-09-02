package br.org.domain.user.registration;

import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.user.dto.UserDto;

public interface SignupUserService {

	void create(UserDto userDto) throws ValidationException, AlreadyExistException, EmailNotificationException;

	void createAdmin(UserDto userDto) throws AlreadyExistException, ValidationException;
}
