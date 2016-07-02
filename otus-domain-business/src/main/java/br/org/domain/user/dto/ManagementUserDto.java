package br.org.domain.user.dto;

import br.org.tutty.Equalization;

public class ManagementUserDto {
    @Equalization(name = "name")
    public String name;

    @Equalization(name = "surname")
    public String surname;

    @Equalization(name = "phone")
    public String phone;

    @Equalization(name = "email")
    public String email;

    @Equalization(name = "admin_flag")
    public Boolean admin;

    @Equalization(name = "enable")
    public Boolean enable;

    public String getEmail() {
        return email;
    }
}
