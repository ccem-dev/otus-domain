package br.org.domain.projects;

import br.org.domain.dao.GenericDao;

import javax.ejb.Stateless;


@Stateless
public interface ProjectDao extends GenericDao {

	void register();
}
