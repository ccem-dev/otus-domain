package br.org.domain.email.dto;

import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

import java.io.UnsupportedEncodingException;

public class EmailSenderDto {

	@Equalization(name = "name")
	private String name;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;

	public void encrypt() throws UnsupportedEncodingException {
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
}
