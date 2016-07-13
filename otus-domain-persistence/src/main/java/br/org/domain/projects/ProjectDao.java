package br.org.domain.projects;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.exceptions.DataNotFoundException;

import java.util.List;

public class ProjectDao extends GenericDaoBean{

	public List<Project> fetchAll() throws DataNotFoundException {
		String query = String.format("db.%s.find({})", "Project");
		return (List<Project>) notWaitingEmpty(getListResult(query, Project.class));
	}
}
