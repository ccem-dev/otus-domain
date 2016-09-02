package br.org.domain.security.services;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.security.dtos.AuthenticationDto;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface SecurityContextService {

    String generateToken(AuthenticationDto authenticationDto, byte[] secretKey) throws JOSEException;

    byte[] generateSecretKey();

    void addToken(String jwtSignedAndSerialized, byte[] secretKey);

    void removeToken(String jwtSignedAndSerialized) throws DataNotFoundException;

    void validateToken(String token) throws TokenException;

    String getUserId(String token) throws ParseException;
}
