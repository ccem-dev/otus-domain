package br.org.domain.email.validation;

import br.org.domain.user.dao.UserDao;

import javax.inject.Inject;

public class EmailConstraint {

    @Inject
    private UserDao userDao;

    public Boolean isUnique(String emailToVerify) {
        if (emailToVerify != null && userDao.emailExists(emailToVerify)) {
            return false;
        } else {
            return true;
        }
    }
}
