package br.org.studio.configuration;

import br.org.domain.configuration.service.SystemConfigServiceBean;
import br.org.domain.system.dao.SystemConfigDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SystemConfigServiceBeanTest {

	@InjectMocks
	private SystemConfigServiceBean systemConfigServiceBean;
	@Mock
	private SystemConfigDao systemConfigDao;

	@Test
	public void method_isReady_should_calls_a_database_to_check_if_the_system_is_ready() {
		systemConfigServiceBean.isReady();
		Mockito.verify(systemConfigDao).isReady();
	}
}
