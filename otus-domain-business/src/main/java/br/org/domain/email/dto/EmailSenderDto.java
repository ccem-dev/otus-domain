package br.org.domain.email.dto;

import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

public class EmailSenderDto implements Dto {

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    @Override
    public Boolean isValid() {
        return (name != null && !name.isEmpty())
                && (email != null && !email.isEmpty())
                && (password != null && !password.isEmpty());
    }

    @Override
    public void encrypt() {
        this.password = EncryptorResources.encryptReversible(password);
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
