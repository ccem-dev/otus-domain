package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.configuration.factories.ConfigFactory;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exception.FillEmailSenderException;
import br.org.domain.exception.InvalidDtoException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.system.SystemConfig;
import br.org.domain.system.dao.SystemConfigDao;
import br.org.domain.user.User;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService {

	@Inject
	private SystemConfigDao systemConfigDao;

    @Inject
    private EmailNotifierService emailNotifierService;
    
    @Inject
    private RepositoryService repositoryService;

	@Override
	public Boolean isReady() {
		return systemConfigDao.isReady();
	}

	@Override
	public void createAdmin(SystemConfigDto systemConfigDto) throws InvalidDtoException {
		try {
			User user = new User();

			Equalizer.equalize(systemConfigDto.getUserDto(), user);

			user.becomesAdm();
			systemConfigDao.persist(user);
			
			repositoryService.createAdminRepository(user, systemConfigDto);

		} catch (Exception e) {
			throw new InvalidDtoException();
		}
	}

	@Override
	public void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws FillEmailSenderException {
		try{
			createAdmin(systemConfigDto);
			SystemConfig systemConfig = ConfigFactory.buildConfigEmailSender(systemConfigDto.getEmailSenderDto());
			systemConfig.finalizeConfiguration();

			systemConfigDao.persist(systemConfig);
		}catch (Exception e){
			throw new FillEmailSenderException();
		}
	}

    @Override
    public void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException {
        try {
            emailNotifierService.sendWelcomeEmail(emailSenderDto);

        } catch (EmailNotificationException | DataNotFoundException e) {
            throw new EmailNotificationException(e);
        }

    }
}
