package br.org.domain.rest.dtos;

import br.org.domain.rest.dtos.repository.RepositoryDto;

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
