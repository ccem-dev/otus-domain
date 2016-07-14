package br.org.domain.projects;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.exception.ConvertedDtoException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.projects.dto.ProjectDto;
import br.org.tutty.Equalizer;

import java.util.ArrayList;
import java.util.List;

@Stateless
@Local(ProjectService.class)
public class ProjectServiceBean implements ProjectService {

    @Inject
    private ProjectDao projectDao;

    @Override
    public void register(ProjectDto projectDto) {
        Project project = new Project();

        Equalizer.equalize(projectDto, project);
        projectDao.persist(project);
    }

    @Override
    public List<ProjectDto> fetchAll() {
        List<ProjectDto> projectDtos = new ArrayList<>();

        try {
            List<Project> projects = projectDao.fetchAll();

            for (Project project : projects) {
                ProjectDto projectDto = new ProjectDto();

                Equalizer.equalize(project, projectDto);
                projectDto.setProjectToken(project.getProjectToken().toString());

                projectDtos.add(projectDto);
            }

        } catch (DataNotFoundException e) {
            return projectDtos;
        }

        return projectDtos;
    }
}
