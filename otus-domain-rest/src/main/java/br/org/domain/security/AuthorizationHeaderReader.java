package br.org.domain.security;

import javax.ws.rs.NotAuthorizedException;

public class AuthorizationHeaderReader {

    public static String readToken(String authorizationHeader){
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("Authorization header must be provided");
        }

        return authorizationHeader.substring("Bearer".length()).trim();
    }
}

