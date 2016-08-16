package br.org.domain.projects;

import br.org.domain.dao.GenericDaoBean;

import java.util.List;

public class ProjectDao extends GenericDaoBean{

	public List<Project> fetchAll() {
		String query = String.format("db.%s.find({})", "Project");
		return (List<Project>) notWaitingEmpty(getListResult(query, Project.class));
	}
}
