package br.org.domain.security.services;

import br.org.domain.exception.EmailNotFoundException;
import br.org.domain.exception.TokenException;
import br.org.domain.exception.UserDisabledException;
import br.org.domain.exception.InvalidPasswordException;
import br.org.domain.security.dtos.AuthenticationDto;

public interface SecurityService {

	String authenticate(AuthenticationDto authenticationDto)
			throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException;

	void invalidate(String token);
}
