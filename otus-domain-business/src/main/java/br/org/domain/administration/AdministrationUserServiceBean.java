package br.org.domain.administration;

import java.util.List;
import java.util.function.Consumer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.dao.RepositoryDao;
import br.org.domain.dao.UserDao;
import br.org.domain.email.DisableUserNotificationEmail;
import br.org.domain.email.EmailNotifierService;
import br.org.domain.email.EnableUserNotificationEmail;
import br.org.domain.entities.system.User;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.repository.RepositoryService;
import br.org.domain.rest.dtos.UserDto;
import br.org.domain.rest.dtos.administration.AdministrationUser;
import br.org.tutty.Equalizer;

/**
 * Created by diogoferreira on 29/10/15.
 */
@Stateless
@Local(AdministrationUserService.class)
public class AdministrationUserServiceBean implements AdministrationUserService {

	@Inject
	private UserDao userDao;

	@Inject
	private EmailNotifierService emailNotifierService;

	@Inject
	private RepositoryService repositoryService;

	@Inject
	private RepositoryDao repositoryDao;

	@Override
	public AdministrationUser fetchUsers() {
		AdministrationUser administrationUser = new AdministrationUser();

		List<User> users = userDao.fetchAll();

		users.stream().forEach(new Consumer<User>() {
			@Override
			public void accept(User user) {
				UserDto userDto = new UserDto();

				try {
					Equalizer.equalize(user, userDto);
					administrationUser.addUser(userDto, user.isEnable());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});

		return administrationUser;
	}

	@Override
	public void disableUsers(List<UserDto> users) {
		users.forEach(new Consumer<UserDto>() {
			@Override
			public void accept(UserDto userDto) {
				try {
					User user = userDao.fetchByEmail(userDto.getEmail());
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
		});

	}

	@Override
	public void enableUsers(List<UserDto> users) {
		users.forEach(new Consumer<UserDto>() {
			@Override
			public void accept(UserDto userDto) {
				try {
					User user = userDao.fetchByEmail(userDto.getEmail());
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
		});

	}
}
