package br.org.studio.rest.dtos.repository;

import java.util.UUID;

import br.org.studio.tool.base.repository.RepositoryDescriptor;
import br.org.tutty.Equalization;

public class RepositoryDto implements RepositoryDescriptor {

	@Equalization(name = "uuid")
	private UUID uuid;

	@Equalization(name = "name")
	private String name;

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

	@Equalization(name = "description")
	private String description;

	public String getName() {
		return name;
	}

	@Override
	public String getRepositoryName() {
		return name;
	}

	@Override
	public String getDatabaseName() {
		return database;
	}

	@Override
	public String getHostName() {
		return host;
	}

	@Override
	public String getPort() {
		return port;
	}

	@Override
	public String getUser() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getDescription() {
		return description;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

}
