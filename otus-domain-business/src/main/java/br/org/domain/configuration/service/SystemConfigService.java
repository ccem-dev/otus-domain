package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exception.FillUserException;
import br.org.domain.email.dto.EmailSenderDto;


/**
 * Created by diogoferreira on 28/09/15.
 */
public interface SystemConfigService {

    Boolean isReady();

	void createAdmin(SystemConfigDto systemConfigDto) throws FillUserException;

	void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws Exception;

    void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException;
}
