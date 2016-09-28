package br.org.domain.security.services;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.InvalidPasswordException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.exception.bussiness.UserDisabledException;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.user.User;
import br.org.domain.user.builder.CurrentUserBuilder;
import br.org.domain.user.dao.UserDao;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.service.ManagementUserService;
import br.org.tutty.Equalizer;
import com.nimbusds.jose.JOSEException;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import java.text.ParseException;

@Stateless
public class SecurityServiceBean implements SecurityService {

    @Inject
    private UserDao userDao;

    @Inject
    private SecurityContextService securityContextService;

    @Inject
    private ManagementUserService managementUserService;

    @Override
    public CurrentUserDto authenticate(AuthenticationDto authenticationDto) throws InvalidPasswordException, UserDisabledException, TokenException, DataNotFoundException {
        try {
            User user = userDao.fetchByEmail(authenticationDto.getEmail());

            if (user.getPassword().equals(authenticationDto.getPassword())) {
                if (user.isEnable()) {
                    CurrentUserDto currentUserDto = new CurrentUserDto();
                    Equalizer.equalize(user, currentUserDto);
                    String jwtSignedAndSerialized = initializeToken(authenticationDto);
                    currentUserDto.setToken(jwtSignedAndSerialized);

                    return currentUserDto;
                } else {
                    throw new UserDisabledException();
                }
            } else {
                throw new InvalidPasswordException();
            }
        } catch (NoResultException e) {
            throw new DataNotFoundException();

        } catch (JOSEException e) {
            throw new TokenException();
        }
    }

    @Override
    public String fetchUserId(String token) throws DataNotFoundException {
        try {
            return securityContextService.getUserId(token);
        } catch (ParseException e) {
            throw new DataNotFoundException(e);
        }
    }

    @Override
    public void invalidate(String token) {
        try {
            securityContextService.removeToken(token);
        } catch (DataNotFoundException e) {
        }
    }

    private String initializeToken(AuthenticationDto authenticationDto) throws TokenException, JOSEException {
        byte[] secretKey = securityContextService.generateSecretKey();
        String jwtSignedAndSerialized = securityContextService.generateToken(authenticationDto, secretKey);
        securityContextService.addToken(jwtSignedAndSerialized, secretKey);

        return jwtSignedAndSerialized;
    }
}
