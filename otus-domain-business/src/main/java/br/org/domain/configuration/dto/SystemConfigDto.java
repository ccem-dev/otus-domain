package br.org.domain.configuration.dto;

import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.rest.Dto;
import br.org.domain.user.dto.UserDto;

import java.io.UnsupportedEncodingException;

public class SystemConfigDto implements Dto {
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

	@Override
	public Boolean isValid() {
		return Boolean.TRUE;
	}

	@Override
	public void encrypt() {
		user.encrypt();
		emailSender.encrypt();
	}

}
