package br.org.studio.dao;

import org.hibernate.Criteria;

import br.org.studio.entities.project.Project;

public class ProjectDaoBean extends GenericDaoBean implements ProjectDao{

	@Override
	public void register() {
		Criteria criteria = createCriteria(Project.class);
	}	
}
