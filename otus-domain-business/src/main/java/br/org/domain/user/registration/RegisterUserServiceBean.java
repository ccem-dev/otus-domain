package br.org.domain.user.registration;

import br.org.domain.email.NewUserNotificationEmail;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exception.InvalidDtoException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.system.dao.SystemConfigDao;
import br.org.domain.user.User;
import br.org.domain.user.dao.UserDao;
import br.org.domain.user.dto.UserDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class RegisterUserServiceBean implements RegisterUserService {

	@Inject
	private SystemConfigDao genericDao;
	@Inject
	private EmailNotifierService emailNotifier;
    @Inject
    private UserDao userDao;
    @Inject
    private EmailNotifierService emailNotifierService;

	@Override
	public void createUser(UserDto userDto) throws InvalidDtoException {
		try {
			User user = new User();
			Equalizer.equalize(userDto, user);
			genericDao.persist(user);

			notifyAdm(user);

		} catch (Exception e) {
			throw new InvalidDtoException();
		}
	}

	private void notifyAdm(User user) {
		try {
			try {
                User admin = userDao.findAdmin();

                NewUserNotificationEmail newUserNotificationEmail = new NewUserNotificationEmail(user);
                newUserNotificationEmail.defineAdminRecipient(admin);
                newUserNotificationEmail.setFrom(emailNotifierService.getSender());

                emailNotifier.sendEmail(newUserNotificationEmail);
			} catch (DataNotFoundException e) {
				e.printStackTrace();
			}
		} catch (EmailNotificationException e) {
			e.printStackTrace();
		}
	}
}