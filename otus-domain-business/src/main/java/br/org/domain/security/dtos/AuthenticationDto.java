package br.org.domain.security.dtos;

import br.org.domain.exception.bussiness.EncryptedException;
import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

public class AuthenticationDto implements Dto {

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    private String issuer;

    public AuthenticationDto() {
    }

    public AuthenticationDto(String email, String password, String issuer) {
        super();
        this.email = email;
        this.password = password;
        this.issuer = issuer;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    @Override
    public Boolean isValid() {
        return (email != null && !email.isEmpty())
                && (password != null && !password.isEmpty());
    }

    @Override
    public void encrypt() throws EncryptedException {
        this.password = EncryptorResources.encryptIrreversible(password);
    }
}
