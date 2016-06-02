package br.org.domain.security.dtos;

import java.io.Serializable;

import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

public class AuthenticationDto implements Serializable {

	private static final long serialVersionUID = 7577651923731847238L;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;

	private String issuer;
	
	public AuthenticationDto(String email, String password, String issuer) {
		super();
		this.email = email;
		this.password = password;
		this.issuer = issuer;
	}

	public void encryptPassword() {
		this.password = EncryptorResources.encrypt(password);
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

	public void setIssuer(String issuer){
		this.issuer = issuer;
	}
}
