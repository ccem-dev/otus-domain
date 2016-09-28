package br.org.domain.user.registration;

import br.org.domain.email.NewUserNotificationEmail;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.user.User;
import br.org.domain.user.dao.UserDao;
import br.org.domain.user.dto.UserDto;
import br.org.domain.user.service.ManagementUserService;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class SignupServiceBean implements SignupUserService {

    @Inject
    private UserDao userDao;

    @Inject
    private ManagementUserService managementUserService;

    @Inject
    private EmailNotifierService emailNotifierService;

    @Override
    public void create(UserDto userDto) throws ValidationException, AlreadyExistException, EmailNotificationException {
        if (userDto.isValid()) {
            if (managementUserService.isUnique(userDto.getEmail())) {
                User user = new User();
                Equalizer.equalize(userDto, user);
                userDao.persist(user);
                notify(user);

            } else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }

    @Override
    public void createAdmin(UserDto userDto) throws AlreadyExistException, ValidationException {
        if (userDto.isValid()) {
            if (managementUserService.isUnique(userDto.getEmail())) {
                User user = new User();
                Equalizer.equalize(userDto, user);
                user.becomesAdm();
                userDao.persist(user);

            } else {
                throw new AlreadyExistException();
            }
        } else {
            throw new ValidationException();
        }
    }

    private void notify(User user) throws EmailNotificationException {
        User admin = userDao.findAdmin();
        NewUserNotificationEmail newUserNotificationEmail = new NewUserNotificationEmail(user);
        newUserNotificationEmail.defineAdminRecipient(admin);
        newUserNotificationEmail.setFrom(emailNotifierService.getSender());
        emailNotifierService.sendEmail(newUserNotificationEmail);
    }
}