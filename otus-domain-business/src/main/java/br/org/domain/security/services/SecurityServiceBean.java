package br.org.domain.security.services;

import br.org.domain.exception.*;
import br.org.domain.user.builder.CurrentUserBuilder;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.User;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.user.dao.UserDao;
import br.org.domain.user.service.ManagementUserService;
import br.org.tutty.Equalizer;
import com.nimbusds.jose.JOSEException;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class SecurityServiceBean implements SecurityService {

    @Inject
    private ManagementUserService userService;

    @Inject
    private SecurityContextService securityContextService;

    @Override
    public CurrentUserDto authenticate(AuthenticationDto authenticationDto) throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException {
        try {
            User user = userService.fetchUserByEmail(authenticationDto.getEmail());

            if (user.getPassword().equals(authenticationDto.getPassword())) {
                if (user.isEnable()) {
                    byte[] secretKey = securityContextService.generateSecretKey();
                    String jwtSignedAndSerialized = securityContextService.generateToken(authenticationDto, secretKey);
                    securityContextService.addToken(jwtSignedAndSerialized, secretKey);

                    CurrentUserDto currentUser = CurrentUserBuilder.build(user, jwtSignedAndSerialized);
                    return currentUser;
                } else {
                    throw new UserDisabledException();
                }
            } else {
                throw new InvalidPasswordException();
            }
        } catch (DataNotFoundException e) {
            throw new EmailNotFoundException();

        } catch (JOSEException e) {
            throw new TokenException();
        }
    }

    @Override
    public String parseUserId(String token) throws DataNotFoundException {
        return securityContextService.getUserId(token);
    }

    @Override
    public void invalidate(String token) {
        try {
            securityContextService.removeToken(token);
        } catch (br.org.domain.exception.DataNotFoundException e) {
        }
    }
}
