package br.org.domain.configuration;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.configuration.factories.ConfigFactory;
import br.org.domain.exception.FillEmailSenderException;
import br.org.domain.repository.RepositoryService;
import br.org.domain.rest.dtos.SystemConfigDto;
import br.org.domain.dao.SystemConfigDao;
import br.org.domain.email.EmailNotifierService;
import br.org.domain.entities.system.SystemConfig;
import br.org.domain.entities.system.User;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exception.FillUserException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.rest.dtos.EmailSenderDto;
import br.org.tutty.Equalizer;

/**
 * Created by diogoferreira on 28/09/15.
 */
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
	public void createAdmin(SystemConfigDto systemConfigDto) throws FillUserException {
		try {
			User user = new User();

			Equalizer.equalize(systemConfigDto.getUserDto(), user);

			user.becomesAdm();
			systemConfigDao.persist(user);
			
			repositoryService.createAdminRepository(user, systemConfigDto);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new FillUserException();
		}
	}

	@Override
	public void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws FillEmailSenderException {
		try{
			createAdmin(systemConfigDto);
			SystemConfig systemConfig = ConfigFactory.buildConfigEmailSender(systemConfigDto.getEmailSenderDto());
			systemConfig.finalizeConfiguration();

			systemConfigDao.persist(systemConfig);
		}catch (IllegalAccessException | NoSuchFieldException | FillUserException e){
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
