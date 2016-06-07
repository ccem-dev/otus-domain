package br.org.studio.otus;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.studio.dao.ProjectDao;
import br.org.studio.rest.dtos.OtusProjectDto;

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
