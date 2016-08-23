package br.org.domain.system;

import br.org.domain.email.EmailSender;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class SystemConfig{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	private Boolean ready;

	@Embedded
	private EmailSender emailSender;

	public SystemConfig(EmailSender emailSender) {
		this.emailSender = emailSender;
	}

	protected SystemConfig() {
	}

	public void finalizeConfiguration() {
		this.ready = Boolean.TRUE;
	}

	public Boolean isReady() {
		return ready;
	}

	public EmailSender getEmailSender() {
		return emailSender;
	}

}
