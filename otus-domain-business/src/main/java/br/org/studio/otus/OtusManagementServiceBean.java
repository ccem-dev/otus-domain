package br.org.studio.otus;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.studio.dao.ProjectDao;
import br.org.studio.entities.project.Project;
import br.org.studio.exception.ConvertedDtoException;
import br.org.studio.rest.dtos.OtusProjectDto;
import br.org.tutty.Equalizer;

@Stateless
@Local(OtusManagementService.class)
public class OtusManagementServiceBean implements OtusManagementService {
	
	@Inject
	private ProjectDao projectDao;
	
	@Override
	public void register(OtusProjectDto otusProjectDto){
		Project project = new Project();
		
		try {
			Equalizer.equalize(otusProjectDto, project);
			projectDao.persist(project);
			
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}			
	}

}
