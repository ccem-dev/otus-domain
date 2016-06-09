package br.org.domain.projects;

import java.util.List;

public interface ProjectService {

	void register(ProjectDto projectDto);

	List<ProjectDto> fetchAll();
}
