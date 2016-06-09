package br.org.domain.projects;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.exceptions.DataNotFoundException;
import org.hibernate.Criteria;

import java.util.List;

public class ProjectDaoBean extends GenericDaoBean implements ProjectDao{

	@Override
	public List<Project> fetchAll() throws DataNotFoundException {
		Criteria criteria = createCriteria(Project.class);
		return (List<Project>) listNotWaitingEmpty(criteria);
	}
}
