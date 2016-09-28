package br.org.domain.user.dto;

import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

public class UserDto implements Dto {

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "surname")
    private String surname;

    @Equalization(name = "phone")
    private String phone;

    @Equalization(name = "email")
    private String email;

    @Equalization(name = "password")
    private String password;

    private String passwordConfirmation;

    @Override
    public Boolean isValid() {
        try {
            InternetAddress internetAddress = new InternetAddress(email);
            internetAddress.validate();

            return (name != null && !name.isEmpty())
                    && (surname != null && !surname.isEmpty())
                    && (phone != null && !phone.isEmpty())
                    && (email != null && !email.isEmpty())
                    && (password != null && !password.isEmpty())
                    && (passwordConfirmation != null && !passwordConfirmation.isEmpty());

        } catch (AddressException e) {
            return Boolean.FALSE;
        }
    }

    public void encrypt() {
        if (password != null && passwordConfirmation != null) {
            this.password = EncryptorResources.encryptIrreversible(password);
            this.passwordConfirmation = EncryptorResources.encryptIrreversible(passwordConfirmation);
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getSurname() {
        return surname;
    }
    
    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }
}