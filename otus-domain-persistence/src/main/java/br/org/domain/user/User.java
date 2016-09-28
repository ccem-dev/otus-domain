package br.org.domain.user;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	@Equalization(name = "id")
	private String id;

	@Equalization(name = "uuid")
	@NotNull
	private UUID uuid;

	@Equalization(name = "name")
	@NotNull
	private String name;

	@Equalization(name = "admin_flag")
	@NotNull
	private Boolean adm;

	@Equalization(name = "surname")
	@NotNull
	private String surname;

	@Equalization(name = "phone")
	@NotNull
	private String phone;

	@Equalization(name = "email")
	@NotNull
	private String email;

	@Equalization(name = "password")
	@NotNull
	private String password;

	@Equalization(name = "enable")
	private Boolean enable;

	public User() {
		this.uuid = UUID.randomUUID();
		this.adm = Boolean.FALSE;
		this.enable = Boolean.FALSE;
	}

	public User(String name, String surname, String password, String email, String phone) {
		this();
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.email = email;
		this.phone = phone;
	}

	public void enable() {
		this.enable = Boolean.TRUE;
	}

	public void disable() {
		this.enable = Boolean.FALSE;
	}

	public void becomesAdm() {
		this.adm = Boolean.TRUE;
		enable();
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Boolean isAdmin() {
		return adm;
	}

	public String getSurname() {
		return surname;
	}

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public Boolean isEnable() {
		return enable;
	}

	public UUID getUuid() {
		return uuid;
	}
	
	public String getFullName() {
		return this.name + " " + this.surname;
	}

}
