package br.org.domain.email;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Embeddable
public class EmailSender {

	@Equalization(name = "name")
	@NotNull
	private String name;

	@Equalization(name = "email")
	@NotNull
	private String emailAddress;

	@Equalization(name = "password")
	@NotNull
	private String password;

	public EmailSender() {
	}

	public EmailSender(String name, String emailAddress, String password) {
		super();
		this.name = name;
		this.emailAddress = emailAddress;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}

}
