package br.org.domain.user.dto;

import br.org.tutty.Equalization;

public class CurrentUserDto {
    @Equalization(name = "name")
    public String name;

    @Equalization(name = "surname")
    public String surname;

    @Equalization(name = "phone")
    public String phone;

    @Equalization(name = "email")
    public String email;

    @Equalization(name = "token")
    public String token;

    public void setToken(String token){
        this.token = token;
    }
}
