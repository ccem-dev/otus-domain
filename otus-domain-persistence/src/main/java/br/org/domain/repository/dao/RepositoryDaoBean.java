package br.org.domain.repository.dao;

import java.util.List;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.repository.Repository;
import br.org.domain.user.User;
import br.org.domain.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

public class RepositoryDaoBean extends GenericDaoBean implements RepositoryDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Repository> fetch(String name) throws DataNotFoundException {
		Criteria criteria = createCriteria(Repository.class);
		criteria.add(Restrictions.eq("name", name));

		return listNotWaitingEmpty(criteria);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Repository> fetchAll() throws DataNotFoundException {
		Criteria criteria = createCriteria(Repository.class);

		return listNotWaitingEmpty(criteria);
	}

	@Override
	public Repository fetchRepositoryByUser(User user) throws DataNotFoundException {
		Criteria criteria = createCriteria(Repository.class);
		criteria.add(Restrictions.eq("user", user));

		return (Repository) uniqueResultNotWaitingEmpty(criteria);
	}

	@Override
	public boolean userHasRepository(User user) {
		try {
			fetchRepositoryByUser(user);
			return true;
		} catch (DataNotFoundException e) {
			return false;
		}
	}
}
