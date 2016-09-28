package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;


public interface SystemConfigService {

    Boolean isReady();

    RepositoryConnectionDataDto fetchRepositoryConnectionData() throws DataNotFoundException;

    Boolean validateEmailService(EmailSenderDto emailSenderDto);

    void create(SystemConfigDto systemConfigDto) throws ValidationException, EmailNotificationException, AlreadyExistException;
}
