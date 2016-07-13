package br.org.domain.user.dao;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.user.User;

import javax.persistence.NoResultException;
import java.util.List;

public class UserDao extends GenericDaoBean{
    private static final String EMAIL = "email";
    private static final String ADM = "adm";


    public Boolean emailExists(String email) {
        String query = String.format("db.%s.find({ '%s' : '%s' })", "User", EMAIL, email);
        try {
            notWaitingEmpty(getSingleResult(query, User.class));
            return Boolean.TRUE;

        } catch (NoResultException | DataNotFoundException e) {
            return Boolean.FALSE;
        }
    }

    public User findAdmin() throws DataNotFoundException {
        String query = String.format("db.%s.find({ '%s' : %s })", "User", ADM, true);
        return (User) notWaitingEmpty(getSingleResult(query, User.class));
    }

    public User fetchByEmail(String email) throws DataNotFoundException {
        String query = String.format("db.%s.find({ '%s' : '%s' })", "User", EMAIL, email);
        return (User) notWaitingEmpty(getSingleResult(query, User.class));
    }

    public User fetchEnableByEmail(String email) throws DataNotFoundException {
        String query = String.format("db.%s.find({ '%s' : '%s', '%s' : '%s' })", "User", EMAIL, email, "enable", true);
        return (User) notWaitingEmpty(getSingleResult(query, User.class));
    }

    public List<User> fetchAll() {
        String query = String.format("db.%s.find({})", "User");
        return getListResult(query, User.class);
    }

}
