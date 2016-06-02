package br.org.studio.dao;

import javax.ejb.Stateless;


@Stateless
public interface ProjectDao extends GenericDao {

	void register();
}
