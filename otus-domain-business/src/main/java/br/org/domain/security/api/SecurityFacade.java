package br.org.domain.security.api;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.InvalidPasswordException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.exception.bussiness.UserDisabledException;
import br.org.domain.response.builder.ResponseBuilder;
import br.org.domain.response.exception.HttpResponseException;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.security.services.SecurityService;
import br.org.domain.user.dto.CurrentUserDto;

import javax.inject.Inject;

public class SecurityFacade {

    @Inject
    private SecurityService securityService;

    public CurrentUserDto authenticate(AuthenticationDto authenticationDto, String issuer) {
        try {
            authenticationDto.setIssuer(issuer);
            return securityService.authenticate(authenticationDto);

        } catch (InvalidPasswordException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Authorization.build());

        } catch (DataNotFoundException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Authorization.build());

        } catch (UserDisabledException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Authorization.build());

        } catch (TokenException e) {
            throw new HttpResponseException(ResponseBuilder.Security.Token.build());
        }
    }

    public void invalidateSession(String token) {
        securityService.invalidate(token);
    }
}
