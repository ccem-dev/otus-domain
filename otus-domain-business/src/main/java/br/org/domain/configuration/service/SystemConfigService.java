package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.exception.InvalidDtoException;


public interface SystemConfigService {

    Boolean isReady();

	void createAdmin(SystemConfigDto systemConfigDto) throws InvalidDtoException;

	void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws Exception;

    void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException;
}
