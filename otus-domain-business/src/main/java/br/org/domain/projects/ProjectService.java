package br.org.domain.projects;

import br.org.domain.projects.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

	void register(ProjectDto projectDto);

	List<ProjectDto> list();
}
