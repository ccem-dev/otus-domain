package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.configuration.factories.SystemConfigFactory;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.repository.api.RepositoryFacade;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.system.RepositoryConnectionData;
import br.org.domain.system.SystemConfig;
import br.org.domain.system.dao.SystemConfigDao;
import br.org.domain.user.api.UserFacade;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;

@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService {

    @Inject
    private SystemConfigDao systemConfigDao;

    @Inject
    private EmailNotifierService emailNotifierService;

    @Inject
    private RepositoryFacade repositoryFacade;

    @Inject
    private UserFacade userFacade;

    @Override
    public Boolean isReady() {
        return systemConfigDao.isReady();
    }

    @Override
    public RepositoryConnectionDataDto fetchRepositoryConnectionData() throws DataNotFoundException {
        try {
            SystemConfig systemConfig = systemConfigDao.fetch();
            RepositoryConnectionData repositoryConnectionData = systemConfig.getRepositoryConnectionData();
            RepositoryConnectionDataDto repositoryConnectionDataDto = new RepositoryConnectionDataDto();
            Equalizer.equalize(repositoryConnectionData, repositoryConnectionDataDto);

            return repositoryConnectionDataDto;

        } catch (NoResultException e) {
            throw new DataNotFoundException();
        }
    }

    @Override
    public Boolean validateEmailService(EmailSenderDto emailSenderDto) {
        try {
            emailNotifierService.sendWelcomeEmail(emailSenderDto);
            return Boolean.TRUE;

        } catch (EmailNotificationException e) {
            return Boolean.FALSE;
        }
    }

    @Override
    public void create(SystemConfigDto systemConfigDto) throws ValidationException, EmailNotificationException, AlreadyExistException {
        if (systemConfigDto.isValid()) {

            if (!isReady()) {
                EmailSenderDto emailSender = systemConfigDto.getEmailSender();

                if (validateEmailService(emailSender)) {
                    SystemConfig systemConfig = SystemConfigFactory.build(systemConfigDto);
                    systemConfig.finalizeConfiguration();
                    systemConfigDao.persist(systemConfig);

                    userFacade.create(systemConfigDto);
                    userFacade.enable(systemConfigDto.getUser().getEmail());

                } else {
                    throw new EmailNotificationException();
                }
            }else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }
}
