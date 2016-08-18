package br.org.domain.user.service;

import br.org.domain.email.DisableUserNotificationEmail;
import br.org.domain.email.EnableUserNotificationEmail;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.DataNotFoundException;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.repository.dao.RepositoryDao;
import br.org.domain.repository.service.RepositoryService;
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
    private SecurityService securityService;

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
    public CurrentUserDto fetchUserByToken(String token) throws DataNotFoundException {
        String email = securityService.parseUserId(token);
        User user = fetchUserByEmail(email);

        CurrentUserDto currentUser = CurrentUserBuilder.build(user, token);
        return currentUser;
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
	public void disableUsers(ManagementUserDto managementUserDto) {
            try {
                User user = userDao.fetchByEmail(managementUserDto.getEmail());
                user.disable();

                userDao.update(user);

                DisableUserNotificationEmail disableUserNotificationEmail = new DisableUserNotificationEmail();
                disableUserNotificationEmail.defineRecipient(user);
                disableUserNotificationEmail.setFrom(emailNotifierService.getSender());

                emailNotifierService.sendEmail(disableUserNotificationEmail);
            } catch (EmailNotificationException e) {
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
            } catch (EmailNotificationException e) {
                e.printStackTrace();
            }
	}
}
