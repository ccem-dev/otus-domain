package br.org.domain.security.services;

import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.TokenException;
import br.org.domain.security.context.SecurityContext;
import br.org.domain.security.dtos.AuthenticationDto;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.security.SecureRandom;
import java.text.ParseException;

@Stateless
@Local(SecurityContextService.class)
public class SecurityContextServiceBean implements SecurityContextService {

    @Inject
    private SecurityContext securityContext;

    @Override
    public String generateToken(AuthenticationDto authenticationDto, byte[] secretKey) throws JOSEException {
        JWSSigner signer = new MACSigner(secretKey);

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), generateClaimsSet(authenticationDto));
        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    private JWTClaimsSet generateClaimsSet(AuthenticationDto authenticationDto) {
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.subject(authenticationDto.getEmail());
        builder.issuer(authenticationDto.getIssuer());

        return builder.build();
    }

    @Override
    public byte[] generateSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] sharedSecret = new byte[32];
        secureRandom.nextBytes(sharedSecret);

        return sharedSecret;
    }

    @Override
    public void addToken(String token, byte[] secretKey) {
        securityContext.add(token, secretKey);
    }

    @Override
    public void removeToken(String token) throws DataNotFoundException {
        try {
            securityContext.remove(token);

        } catch (ParseException e) {
            throw new DataNotFoundException();
        }
    }

    @Override
    public void validateToken(String token) throws TokenException {
        try {
            if (securityContext.hasToken(token)) {
                securityContext.verifySignature(token);
            } else {
                throw new TokenException();
            }
        } catch (ParseException | JOSEException e) {
            throw new TokenException();
        }
    }

    @Override
    public String getUserId(String token) throws ParseException {
        return securityContext.getUserId(token);
    }
}
