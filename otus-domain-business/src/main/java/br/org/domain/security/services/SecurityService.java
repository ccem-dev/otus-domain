package br.org.domain.security.services;

import br.org.domain.exception.*;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.user.dto.CurrentUserDto;

public interface SecurityService {

	CurrentUserDto authenticate(AuthenticationDto authenticationDto)
			throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException;

	String parseUserId(String token) throws DataNotFoundException;

	void invalidate(String token);
}
