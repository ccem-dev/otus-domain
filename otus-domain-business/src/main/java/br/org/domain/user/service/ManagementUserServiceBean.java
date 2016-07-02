package br.org.domain.user.service;

import br.org.domain.user.dto.ManagementUserDto;
import br.org.domain.email.DisableUserNotificationEmail;
import br.org.domain.email.EnableUserNotificationEmail;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.repository.dao.RepositoryDao;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.user.User;
import br.org.domain.user.dao.UserDao;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Stateless
@Local(ManagementUserService.class)
public class ManagementUserServiceBean implements ManagementUserService {

	@Inject
	private UserDao userDao;

	@Inject
	private EmailNotifierService emailNotifierService;

	@Inject
	private RepositoryService repositoryService;

	@Inject
	private RepositoryDao repositoryDao;

	@Override
	public List<ManagementUserDto> fetchUsers() {
		List<ManagementUserDto> administrationUsersDtos = new ArrayList<>();
		List<User> users = userDao.fetchAll();

		users.stream().forEach(user -> {
            ManagementUserDto managementUserDto = new ManagementUserDto();

            try {
                Equalizer.equalize(user, managementUserDto);
                administrationUsersDtos.add(managementUserDto);

            } catch (Exception e) {
                e.printStackTrace();
            }
        });

		return administrationUsersDtos;
	}

	@Override
	public void disableUsers(ManagementUserDto managementUserDto) {
            try {
                User user = userDao.fetchByEmail(managementUserDto.getEmail());
                user.disable();

                userDao.update(user);

                DisableUserNotificationEmail disableUserNotificationEmail = new DisableUserNotificationEmail();
                disableUserNotificationEmail.defineRecipient(user);
                disableUserNotificationEmail.setFrom(emailNotifierService.getSender());

                emailNotifierService.sendEmail(disableUserNotificationEmail);
            } catch (DataNotFoundException | EmailNotificationException e) {
                e.printStackTrace();
            }
	}

	@Override
	public void enableUsers(ManagementUserDto managementUserDto) {
            try {
                User user = userDao.fetchByEmail(managementUserDto.getEmail());
                user.enable();

                userDao.update(user);

                EnableUserNotificationEmail enableUserNotificationEmail = new EnableUserNotificationEmail();
                enableUserNotificationEmail.defineRecipient(user);
                enableUserNotificationEmail.setFrom(emailNotifierService.getSender());

                if (!repositoryDao.userHasRepository(user)) {
                    repositoryService.createRepositoryTo(user);
                }

                emailNotifierService.sendEmail(enableUserNotificationEmail);
            } catch (DataNotFoundException | EmailNotificationException e) {
                e.printStackTrace();
            }
	}
}
