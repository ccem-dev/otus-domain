package br.org.domain.projects.api;

import br.org.domain.projects.ProjectService;
import br.org.domain.projects.dto.ProjectDto;

import javax.inject.Inject;
import java.util.List;

public class ProjectFacade {

    @Inject
    private ProjectService projectService;

    public void register(ProjectDto projectDto){
        projectService.register(projectDto);
    }

    public List<ProjectDto> list(){
        return projectService.list();
    }
}
