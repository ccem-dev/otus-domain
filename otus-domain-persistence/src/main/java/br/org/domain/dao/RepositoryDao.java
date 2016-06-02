package br.org.domain.dao;

import java.util.List;

import javax.ejb.Stateless;

import br.org.domain.entities.repository.Repository;
import br.org.domain.entities.system.User;
import br.org.domain.exceptions.DataNotFoundException;

/**
 * Created by diogoferreira on 01/12/15.
 */
@Stateless
public interface RepositoryDao extends GenericDao {
	List<Repository> fetch(String name) throws DataNotFoundException;

	List<Repository> fetchAll() throws DataNotFoundException;

	Repository fetchRepositoryByUser(User user) throws DataNotFoundException;

	boolean userHasRepository(User user);
}
