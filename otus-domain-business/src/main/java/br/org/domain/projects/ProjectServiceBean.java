package br.org.domain.projects;

import br.org.domain.projects.builder.ProjectBuilder;
import br.org.domain.projects.dto.ProjectDto;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
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
    public List<ProjectDto> list() {
        try {
            List<Project> projects = projectDao.fetchAll();
            return ProjectBuilder.build(projects);

        } catch (NoResultException e) {
            return new ArrayList<>();
        }
    }
}
