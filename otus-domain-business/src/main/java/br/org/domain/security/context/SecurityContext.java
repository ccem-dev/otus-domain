package br.org.domain.security.context;

import java.io.Serializable;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;

@ApplicationScoped
public class SecurityContext implements Serializable {

    private static final long serialVersionUID = 109656450161251588L;

    private Map<String, byte[]> securityMap;

    @PostConstruct
    public void setUp() {
        securityMap = new HashMap<String, byte[]>();
    }

    public void add(String jwtSignedAndSerialized, byte[] secretKey) {
        securityMap.put(jwtSignedAndSerialized, secretKey);
    }

    public void remove(String token) {
        securityMap.remove(token);
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
