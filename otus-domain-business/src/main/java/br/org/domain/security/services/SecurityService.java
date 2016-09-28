package br.org.domain.security.services;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.InvalidPasswordException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.exception.bussiness.UserDisabledException;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.user.dto.CurrentUserDto;

public interface SecurityService {

	CurrentUserDto authenticate(AuthenticationDto authenticationDto)
			throws InvalidPasswordException, UserDisabledException, TokenException, DataNotFoundException;

	String fetchUserId(String token) throws DataNotFoundException;

	void invalidate(String token);
}
