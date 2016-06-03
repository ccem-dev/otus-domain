package br.org.domain.system;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.org.domain.email.EmailSender;

@Entity
@Table(name = "system_config")
@SequenceGenerator(name = "SystemConfigSequence", sequenceName = "system_config_seq", initialValue = 1, allocationSize = 1)
public class SystemConfig implements Serializable {

	private static final long serialVersionUID = -2630898111000415759L;

	@Id
	@GeneratedValue(generator = "SystemConfigSequence", strategy = GenerationType.SEQUENCE)
	private Long id;

	private Boolean ready;

	@OneToOne(cascade = CascadeType.ALL)
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
