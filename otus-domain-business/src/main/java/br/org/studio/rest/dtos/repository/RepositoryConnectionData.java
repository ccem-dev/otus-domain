package br.org.studio.rest.dtos.repository;

import java.util.Base64;

import br.org.studio.entities.repository.Repository;
import br.org.studio.tool.base.repository.RepositoryConnectionDataDescriptor;

public class RepositoryConnectionData implements RepositoryConnectionDataDescriptor {

	private String database;
	private String port;
	private String host;
	private String password;
	private String username;

	public RepositoryConnectionData(Repository admRepository) {
		super();
		this.database = admRepository.getDatabase();
		this.port = admRepository.getPort();
		this.host = admRepository.getHost();
		this.password = admRepository.getPassword();
		this.username = admRepository.getUsername();
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	@Override
	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	@Override
	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	@Override
	public String getPassword() {
		byte[] decodedPassword = Base64.getDecoder().decode(this.password.getBytes());
		return new String(decodedPassword);
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public void encrypt() {
		byte[] encode = Base64.getEncoder().encode(this.password.getBytes());
		this.password = new String(encode);
	}

}
