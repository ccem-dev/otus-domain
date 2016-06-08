package br.org.domain.projects;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.exception.ConvertedDtoException;
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
