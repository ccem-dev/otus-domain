package br.org.studio.otus;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.studio.dao.GenericDao;
import br.org.studio.entities.project.Project;
import br.org.studio.exception.ConvertedDtoException;
import br.org.studio.rest.dtos.OtusProjectDto;
import br.org.tutty.Equalizer;

@Stateless
public class OtusManagementServiceBean implements OtusManagementService {
	@Inject
	private GenericDao genericDao;
	
	@Override
	public void register(OtusProjectDto otusProjectDto){
		Project project = new Project();
		
		try {
			Equalizer.equalize(otusProjectDto, project);
			genericDao.persist(project);
			
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}			
	}

}
