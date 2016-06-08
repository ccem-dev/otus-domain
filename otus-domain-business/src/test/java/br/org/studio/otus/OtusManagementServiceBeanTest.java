package br.org.studio.otus;

import br.org.domain.projects.OtusManagementServiceBean;
import br.org.domain.projects.OtusProjectDto;
import br.org.domain.projects.ProjectDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class OtusManagementServiceBeanTest {

	@InjectMocks
	private OtusManagementServiceBean otusManagementServiceBean;
	
	@Mock
	private ProjectDao projectDao;
	
	@Mock
	private OtusProjectDto otusProjectDto;
	
	@Test
	public void method_register_should_calls_a_database_to_check_if_the_system_register(){
		otusManagementServiceBean.register(otusProjectDto);
		
		//TODO 
		//Mockito.verify();

	}
	
}
