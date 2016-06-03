package br.org.domain.repository.dao;

import java.util.List;

import javax.ejb.Stateless;

import br.org.domain.dao.GenericDao;
import br.org.domain.repository.Repository;
import br.org.domain.user.User;
import br.org.domain.exceptions.DataNotFoundException;

@Stateless
public interface RepositoryDao extends GenericDao {
	List<Repository> fetch(String name) throws DataNotFoundException;

	List<Repository> fetchAll() throws DataNotFoundException;

	Repository fetchRepositoryByUser(User user) throws DataNotFoundException;

	boolean userHasRepository(User user);
}
