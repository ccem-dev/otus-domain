package br.org.studio.entities.repository;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import br.org.studio.entities.system.User;
import br.org.tutty.Equalization;

@Entity
@Table(name = "repository", schema = "public")
@SequenceGenerator(name = "repositorySequence", sequenceName = "repository_seq", initialValue = 1, allocationSize = 1)
public class Repository implements Serializable {

	private static final long serialVersionUID = 7319297696352112154L;

	@Id
	@GeneratedValue(generator = "repositorySequence", strategy = GenerationType.SEQUENCE)
	private Long id;

	@Equalization(name = "uuid")
	@NotNull
	private UUID uuid;

	@Equalization(name = "name")
	@NotNull
	private String name;

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

	@Equalization(name = "description")
	private String description;
	
	@OneToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="id")
	private User userFK;

	public Repository() {
		this.uuid = UUID.randomUUID();
	}

	public UUID getUuid() {
		return uuid;
	}

	public User getUserFK() {
		return userFK;
	}

	public void setUserFK(User userFK) {
		this.userFK = userFK;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
