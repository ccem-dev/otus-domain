package br.org.domain.system;

import br.org.domain.email.EmailSender;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
public class SystemConfig{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	private Boolean ready;

	@Embedded
	private EmailSender emailSender;

	@Embedded
	private RepositoryConnectionData repositoryConnectionData;

	protected SystemConfig() {
	}

	public SystemConfig(EmailSender emailSender, RepositoryConnectionData repositoryConnectionData) {
		this.emailSender = emailSender;
		this.repositoryConnectionData = repositoryConnectionData;
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

	public RepositoryConnectionData getRepositoryConnectionData() {
		return repositoryConnectionData;
	}
}
