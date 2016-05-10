package br.org.studio.repository;

import java.sql.SQLException;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import br.org.studio.dao.RepositoryDaoBean;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.repository.Repository;
import br.org.studio.entities.system.User;
import br.org.studio.exception.RepositoryAlreadyExistException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.rest.dtos.repository.RepositoryConnectionData;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import br.org.studio.tool.RepositoryManagerFacade;
import br.org.studio.tool.mongodb.repository.MongoRepositoryConfiguration;

@RunWith(PowerMockRunner.class)
@PrepareForTest(MongoRepositoryConfiguration.class)
public class RepositoryServiceBeanTest {
	@InjectMocks
	private RepositoryServiceBean repositoryServiceBean;

	@Mock
	private RepositoryDaoBean repositoryDaoBean;

	@Mock
	private RepositoryDto repositoryDto;

	@Mock
	private MongoRepositoryConfiguration repositoryConfiguration;

	@Mock
	private RepositoryManagerFacade repositoryManagerFacade;

	@Mock
	private UserDao userDao;

	private User user;

	@Before
	public void setUp() {
		user = new User();
	}

	@Test
	public void persist_should_persist_repository_data() {
		RepositoryDto repositoryDto = new RepositoryDto();
		repositoryDto.setPassword("secret_password");
		
		repositoryServiceBean.persist(repositoryDto);
		Mockito.verify(repositoryDaoBean).persist(Matchers.any());
	}

	@Test(expected = RepositoryAlreadyExistException.class)
	public void create_should_throw_repositoryAlreadyExistException_when_already_exist()
			throws RepositoryAlreadyExistException, RepositoryOfflineException, SQLException {
		PowerMockito.mockStatic(MongoRepositoryConfiguration.class);

		PowerMockito.when(MongoRepositoryConfiguration.create(repositoryDto)).thenReturn(repositoryConfiguration);
		PowerMockito.when(repositoryManagerFacade.isRepositoryAccessible(repositoryConfiguration)).thenReturn(true);
		PowerMockito.when(repositoryManagerFacade.existRepository(repositoryConfiguration)).thenReturn(true);

		repositoryServiceBean.create(repositoryDto);
	}

	@Test
	public void create_should_call_facade_to_create()
			throws RepositoryAlreadyExistException, RepositoryOfflineException, SQLException {
		PowerMockito.mockStatic(MongoRepositoryConfiguration.class);

		PowerMockito.when(MongoRepositoryConfiguration.create(repositoryDto)).thenReturn(repositoryConfiguration);
		PowerMockito.when(repositoryManagerFacade.isRepositoryAccessible(repositoryConfiguration)).thenReturn(true);
		PowerMockito.when(repositoryManagerFacade.existRepository(repositoryConfiguration)).thenReturn(false);

		repositoryServiceBean.create(repositoryDto);

		Mockito.verify(repositoryManagerFacade).createRepository(repositoryConfiguration);
	}

	@Test
	public void create_should_call_connect_after_create()
			throws RepositoryAlreadyExistException, RepositoryOfflineException, SQLException {
		PowerMockito.mockStatic(MongoRepositoryConfiguration.class);

		PowerMockito.when(MongoRepositoryConfiguration.create(repositoryDto)).thenReturn(repositoryConfiguration);
		PowerMockito.when(repositoryManagerFacade.isRepositoryAccessible(repositoryConfiguration)).thenReturn(true);
		PowerMockito.when(repositoryManagerFacade.existRepository(repositoryConfiguration)).thenReturn(false);

		repositoryServiceBean.create(repositoryDto);

		Mockito.verify(repositoryDaoBean).persist(Matchers.any(Repository.class));
	}


	@Test
	@Ignore
	public void createRepositoryTo_should_calls_a_create_method() throws RepositoryOfflineException, SQLException, RepositoryAlreadyExistException {
		PowerMockito.mockStatic(MongoRepositoryConfiguration.class);
		PowerMockito.when(MongoRepositoryConfiguration.create(repositoryDto)).thenReturn(repositoryConfiguration);
		PowerMockito.when(repositoryManagerFacade.isRepositoryAccessible(repositoryConfiguration)).thenReturn(true);
		PowerMockito.when(repositoryManagerFacade.existRepository(repositoryConfiguration)).thenReturn(false);
		PowerMockito.when(repositoryServiceBean.validationConnection(Matchers.any(RepositoryConnectionData.class))).thenReturn(true);
		
		repositoryServiceBean.createRepositoryTo(user);
		
		Mockito.verify(repositoryManagerFacade).createRepository(Matchers.any());
		Mockito.verify(repositoryManagerFacade).createRepository(Matchers.any());
		
	}

}
