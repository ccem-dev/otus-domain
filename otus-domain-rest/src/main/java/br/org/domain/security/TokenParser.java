package br.org.domain.security;

public class TokenParser {

    public static String parse(String authorizationHeader){
        return authorizationHeader.substring("Bearer".length()).trim();
    }
}
