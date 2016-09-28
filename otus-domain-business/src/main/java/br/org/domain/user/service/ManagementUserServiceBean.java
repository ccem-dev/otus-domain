package br.org.domain.user.service;

import br.org.domain.email.DisableUserNotificationEmail;
import br.org.domain.email.EnableUserNotificationEmail;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.bussiness.*;
import br.org.domain.repository.api.RepositoryInternalFacade;
import br.org.domain.repository.dao.RepositoryDao;
import br.org.domain.security.services.SecurityService;
import br.org.domain.user.User;
import br.org.domain.user.builder.CurrentUserBuilder;
import br.org.domain.user.dao.UserDao;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.domain.user.dto.ManagementUserDto;
import br.org.tutty.Equalizer;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class ManagementUserServiceBean implements ManagementUserService {

    @Inject
    private UserDao userDao;

    @Inject
    private EmailNotifierService emailNotifierService;

    @Inject
    private RepositoryInternalFacade repositoryInternalFacade;

    @Inject
    private RepositoryDao repositoryDao;

    @Inject
    private SecurityService securityService;

    @Override
    public List<ManagementUserDto> list() {
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
    public void disable(String email) throws EmailNotificationException, DataNotFoundException {
        try {
            User user = userDao.fetchByEmail(email);
            if (!user.isAdmin()) {
                user.disable();

                userDao.update(user);

                DisableUserNotificationEmail disableUserNotificationEmail = new DisableUserNotificationEmail();
                disableUserNotificationEmail.defineRecipient(user);
                disableUserNotificationEmail.setFrom(emailNotifierService.getSender());

                emailNotifierService.sendEmail(disableUserNotificationEmail);
            }

        } catch (NoResultException e) {
            throw new DataNotFoundException();
        }
    }

    @Override
    public void enable(String email) throws EmailNotificationException, DataNotFoundException, RepositoryConnectionNotFound, RepositoryOfflineException, ValidationException {
        try {
            User user = userDao.fetchByEmail(email);
            user.enable();
            userDao.update(user);

            EnableUserNotificationEmail enableUserNotificationEmail = new EnableUserNotificationEmail();
            enableUserNotificationEmail.defineRecipient(user);
            enableUserNotificationEmail.setFrom(emailNotifierService.getSender());

            repositoryInternalFacade.createTo(user);
            emailNotifierService.sendEmail(enableUserNotificationEmail);

        } catch (NoResultException e) {
            throw new DataNotFoundException();

        } catch (AlreadyExistException e) {
        }
    }

    @Override
    public User fetchUserByEmail(String email) throws DataNotFoundException {
        try {
            return userDao.fetchByEmail(email);
        }catch (NoResultException e){
            throw new DataNotFoundException();
        }
    }

    @Override
    public CurrentUserDto fetchCurrentUser(String token) throws DataNotFoundException {
        String email = securityService.fetchUserId(token);
        User user = fetchUserByEmail(email);
        CurrentUserDto currentUser = CurrentUserBuilder.build(user, token);
        return currentUser;
    }

    @Override
    public Boolean isUnique(String email) {
        if (email != null && userDao.emailExists(email)) {
            return Boolean.FALSE;
        } else {
            return Boolean.TRUE;
        }
    }

}
