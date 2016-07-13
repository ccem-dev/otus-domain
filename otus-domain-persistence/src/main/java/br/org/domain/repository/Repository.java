package br.org.domain.repository;

import br.org.domain.user.User;
import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
public class Repository {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	@Equalization(name = "uuid")
	@NotNull
	private UUID uuid;

	@Equalization(name = "database")
	@NotNull
	private String database;

	@Equalization(name = "host")
	@NotNull
	private String host;

	@Equalization(name = "port")
	@NotNull
	private String port;

	@Equalization(name = "username")
	@NotNull
	private String username;

	@Equalization(name = "password")
	@NotNull
	private String password;

	@Equalization(name = "user")
	@OneToOne(cascade = CascadeType.ALL)
	private User user;

	public Repository() {
		this.uuid = UUID.randomUUID();
	}

	public UUID getUuid() {
		return uuid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getId() {
		return id;
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
