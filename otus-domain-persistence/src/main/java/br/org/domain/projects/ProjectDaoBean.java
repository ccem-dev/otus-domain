package br.org.domain.projects;

import br.org.domain.dao.GenericDaoBean;
import org.hibernate.Criteria;

public class ProjectDaoBean extends GenericDaoBean implements ProjectDao{

	@Override
	public void register() {
		Criteria criteria = createCriteria(Project.class);
	}	
}
