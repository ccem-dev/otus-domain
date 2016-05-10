package br.org.studio.rest.dtos.repository;

import java.util.Base64;

import br.org.studio.entities.system.User;
import br.org.studio.tool.base.repository.RepositoryConnectionDataDescriptor;
import br.org.studio.tool.base.repository.RepositoryDescriptor;
import br.org.tutty.Equalization;

public class RepositoryDto implements RepositoryDescriptor {

	@Equalization(name = "database")
	private String database;

	@Equalization(name = "host")
	private String host;

	@Equalization(name = "port")
	private String port;

	@Equalization(name = "username")
	private String username;

	@Equalization(name = "password")
	private String password;

	@Equalization(name = "user")
	private User user;
	
	private RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor;

	private byte[] encode;

	@Override
	public String getDatabaseName() {
		return database;
	}

	public String getHostName() {
		return host;
	}

	public String getPort() {
		return port;
	}

	@Override
	public String getUserName() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public RepositoryConnectionDataDescriptor getRepositoryConnectionDataDescriptor() {
		return repositoryConnectionDataDescriptor;
	}

	public void setRepositoryConnectionDataDescriptor(
			RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor) {
		this.repositoryConnectionDataDescriptor = repositoryConnectionDataDescriptor;
	}

	public void encrypt() {
		encode = Base64.getEncoder().encode(this.password.getBytes());
		this.password = new String(encode);
	}

}
