package br.org.domain.security.context;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class SecurityContext {
    private Map<String, byte[]> securityMap;

    @PostConstruct
    public void setUp() {
        securityMap = new HashMap<>();
    }

    public void add(String jwtSignedAndSerialized, byte[] secretKey) {
        securityMap.put(jwtSignedAndSerialized, secretKey);
    }

    public void remove(String token) throws ParseException {
        if (token != null) {
            String tokenWithoutPrefix = token.substring("Bearer".length()).trim();
            securityMap.remove(tokenWithoutPrefix);
        }
    }

    public String getUserId(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getSubject();
    }

    public Boolean hasToken(String token) {
        return securityMap.containsKey(token);
    }

    public Boolean verifySignature(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        byte[] sharedSecret = securityMap.get(token);
        JWSVerifier verifier = new MACVerifier(sharedSecret);
        return signedJWT.verify(verifier);
    }
}
