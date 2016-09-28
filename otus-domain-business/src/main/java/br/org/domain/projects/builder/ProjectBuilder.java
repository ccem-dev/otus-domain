package br.org.domain.projects.builder;

import br.org.domain.projects.Project;
import br.org.domain.projects.dto.ProjectDto;
import br.org.tutty.Equalizer;

import java.util.ArrayList;
import java.util.List;

public class ProjectBuilder {

    public static List<ProjectDto> build(List<Project> projects){
        List<ProjectDto> projectDtos = new ArrayList<>();

        projects.stream().forEach(project -> {
            ProjectDto projectDto = new ProjectDto();
            Equalizer.equalize(project, projectDto);
            projectDtos.add(projectDto);
        });

        return projectDtos;
    }
}
