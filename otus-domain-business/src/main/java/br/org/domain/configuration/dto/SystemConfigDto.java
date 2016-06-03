package br.org.domain.configuration.dto;

import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.administration.dto.UserDto;

public class SystemConfigDto {
	private UserDto user;
	private EmailSenderDto emailSender;
	private RepositoryDto repository;

	public UserDto getUserDto() {
		return user;
	}

	public EmailSenderDto getEmailSenderDto() {
		return emailSender;
	}

	public RepositoryDto getRepositoryDto() {
		return repository;
	}

}
