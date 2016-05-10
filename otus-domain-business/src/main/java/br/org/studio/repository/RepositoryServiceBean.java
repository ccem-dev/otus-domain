package br.org.studio.repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.studio.dao.RepositoryDao;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.repository.Repository;
import br.org.studio.entities.system.User;
import br.org.studio.exception.ConvertedDtoException;
import br.org.studio.exception.RepositoryAlreadyExistException;
import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.SystemConfigDto;
import br.org.studio.rest.dtos.repository.RepositoryConnectionData;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import br.org.studio.security.PasswordGenerator;
import br.org.studio.tool.RepositoryManagerFacade;
import br.org.studio.tool.base.repository.configuration.RepositoryConfiguration;
import br.org.studio.tool.mongodb.database.MongoConnector;
import br.org.studio.tool.mongodb.repository.MongoRepositoryConfiguration;
import br.org.tutty.Equalizer;

@Stateless
@Local(RepositoryService.class)
public class RepositoryServiceBean implements RepositoryService {

	@Inject
	private RepositoryDao repositoryDao;

	@Inject
	private UserDao userDao;

	private RepositoryManagerFacade repositoryFacade;

	public RepositoryServiceBean() {
		repositoryFacade = new RepositoryManagerFacade();
	}

	@Override
	public List<RepositoryDto> fetchRepository(String name) throws RepositoryNotFoundException {
		try {
			List<Repository> repositories = repositoryDao.fetch(name);
			List<RepositoryDto> convertedRepositories = new ArrayList<>();

			repositories.stream().forEach(new Consumer<Repository>() {
				@Override
				public void accept(Repository repository) {
					RepositoryDto repositoryDto = new RepositoryDto();
					try {
						Equalizer.equalize(repository, repositoryDto);
						convertedRepositories.add(repositoryDto);
					} catch (IllegalAccessException | NoSuchFieldException e) {
					}
				}
			});

			return convertedRepositories;
		} catch (DataNotFoundException e) {
			throw new RepositoryNotFoundException();
		}
	}

	@Override
	public List<RepositoryDto> fetchAll() throws RepositoryNotFoundException {
		try {
			List<Repository> repositories = repositoryDao.fetchAll();
			List<RepositoryDto> convertedRepositories = new ArrayList<>();

			repositories.stream().forEach(new Consumer<Repository>() {
				@Override
				public void accept(Repository repository) {
					RepositoryDto repositoryDto = new RepositoryDto();
					try {
						Equalizer.equalize(repository, repositoryDto);
						convertedRepositories.add(repositoryDto);
					} catch (IllegalAccessException | NoSuchFieldException e) {
					}
				}
			});

			return convertedRepositories;
		} catch (DataNotFoundException e) {
			throw new RepositoryNotFoundException();
		}
	}

	@Override
	public void create(RepositoryDto repositoryDto)
			throws RepositoryOfflineException, SQLException, RepositoryAlreadyExistException {

		RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);

			if (!existsDatabase(repositoryDto)) {
				repositoryFacade.createRepository(configuration);
				persist(repositoryDto);
			} else {
				throw new RepositoryAlreadyExistException();
			}
	}

	@Override
	public void persist(RepositoryDto repositoryDto) {
		Repository repository = new Repository();
		try {
			repositoryDto.encrypt();
			Equalizer.equalize(repositoryDto, repository);
			repositoryDao.persist(repository);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}
	}

	@Override
	public Boolean existsDatabase(RepositoryDto repositoryDto) {
		try {
			RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);
			return repositoryFacade.existRepository(configuration);

		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}

	@Override
	public Boolean validationConnection(RepositoryConnectionData repositoryConnectionData) {
		RepositoryDto repositoryDto = new RepositoryDto();
		repositoryDto.setRepositoryConnectionDataDescriptor(repositoryConnectionData);
		
		try {
			RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);
			return repositoryFacade.isRepositoryAccessible(configuration);

		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}

	@Override
	public Boolean checkRepositoryCredentials(RepositoryConnectionData repositoryConnectionData) {
		return MongoConnector.getConnector(repositoryConnectionData.getHost(), repositoryConnectionData.getPort())
				.isValidCredentials(repositoryConnectionData.getUsername(), repositoryConnectionData.getDatabase(), repositoryConnectionData.getPassword());
	}

	@Override
	public void createRepositoryTo(User user) {
		Repository repository = buildRepositoryWithUser(user);
		RepositoryDto repositoryDto = new RepositoryDto();

		try {
			Equalizer.equalize(repository, repositoryDto);
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}

		repositoryDto.setRepositoryConnectionDataDescriptor(getAdminRepositoryConnectionData());

		try {
			create(repositoryDto);
		} catch (RepositoryOfflineException | SQLException | RepositoryAlreadyExistException e) {
			e.printStackTrace();
		}

	}

	private RepositoryConnectionData getAdminRepositoryConnectionData() {
		User admin = null;
		Repository adminRepository = null;
		try {
			admin = userDao.findAdmin();
		} catch (DataNotFoundException e) {
			e.printStackTrace();
		}

		try {
			adminRepository = repositoryDao.fetchRepositoryByUser(admin);
		} catch (DataNotFoundException e) {
			e.printStackTrace();
		}

		return new RepositoryConnectionData(adminRepository);
	}

	@Override
	public void createAdminRepository(User admin, SystemConfigDto systemConfigDto) {
		Repository repository = buildRepositoryWithUser(admin, systemConfigDto);
		RepositoryDto repositoryDto = new RepositoryDto();
		try {
			Equalizer.equalize(repository, repositoryDto);
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}
		persist(repositoryDto);
	}

	private Repository buildRepositoryWithUser(User user, SystemConfigDto systemConfigDto) {
		Repository repository = new Repository();

		repository.setUser(user);

		repository.setDatabase(systemConfigDto.getRepositoryDto().getDatabaseName());
		repository.setPort(systemConfigDto.getRepositoryDto().getPort());
		repository.setHost(systemConfigDto.getRepositoryDto().getHostName());

		repository.setUsername(systemConfigDto.getRepositoryDto().getUserName());
		repository.setPassword(systemConfigDto.getRepositoryDto().getPassword());

		return repository;
	}

	private Repository buildRepositoryWithUser(User user) {
		Repository repository = new Repository();
		RepositoryConnectionData adminRepositoryConnectionData = getAdminRepositoryConnectionData();

		repository.setUser(user);
		repository.setDatabase(user.getUuid().toString());
		repository.setUsername(user.getEmail());
		repository.setPassword(PasswordGenerator.generateRandom());
		
		repository.setHost(adminRepositoryConnectionData.getHost());
		repository.setPort(adminRepositoryConnectionData.getPort());

		return repository;
	}
}
