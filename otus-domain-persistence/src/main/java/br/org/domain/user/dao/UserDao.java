package br.org.domain.user.dao;

import br.org.domain.dao.GenericDao;
import br.org.domain.user.User;
import br.org.domain.exceptions.DataNotFoundException;
import java.util.List;

public interface UserDao extends GenericDao {

    Boolean emailExists(String email);

	User findAdmin() throws DataNotFoundException;

	User fetchByEmail(String email) throws DataNotFoundException;

    User fetchEnableByEmail(String email) throws DataNotFoundException;

    List fetchAll();

}
