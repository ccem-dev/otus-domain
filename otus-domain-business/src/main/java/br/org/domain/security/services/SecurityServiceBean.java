package br.org.domain.security.services;

import br.org.domain.user.dao.UserDao;
import br.org.domain.user.User;
import br.org.domain.exception.EmailNotFoundException;
import br.org.domain.exception.InvalidPasswordException;
import br.org.domain.exception.TokenException;
import br.org.domain.exception.UserDisabledException;
import br.org.domain.security.dtos.AuthenticationDto;
import br.org.domain.exceptions.DataNotFoundException;
import com.nimbusds.jose.JOSEException;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.Serializable;

@Stateless
@Local(SecurityService.class)
public class SecurityServiceBean implements SecurityService, Serializable {

    private static final long serialVersionUID = 4909468163432086501L;

    @Inject
    private UserDao userDao;

    @Inject
    private SecurityContextService securityContextService;

    @Override
    public String authenticate(AuthenticationDto authenticationDto) throws InvalidPasswordException, EmailNotFoundException, UserDisabledException, TokenException {
        try {
            User user = userDao.fetchByEmail(authenticationDto.getEmail());

            if (user.getPassword().equals(authenticationDto.getPassword())) {
                if (user.isEnable()) {
                    byte[] secretKey = securityContextService.generateSecretKey();
                    String jwtSignedAndSerialized = securityContextService.generateToken(authenticationDto, secretKey);
                    securityContextService.addToken(jwtSignedAndSerialized, secretKey);

                    return jwtSignedAndSerialized;
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
    public void invalidate(String token){
        securityContextService.removeToken(token);
    }
}
