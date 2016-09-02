package br.org.domain.security.services;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.InvalidPasswordException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.exception.bussiness.UserDisabledException;
import br.org.domain.security.dtos.AuthenticationDto;

public interface SecurityService {

	String authenticate(AuthenticationDto authenticationDto)
			throws InvalidPasswordException, UserDisabledException, TokenException, DataNotFoundException;

	void invalidate(String token);
}
