package br.org.domain.user.dto;

import br.org.domain.security.EncryptorResources;
import br.org.tutty.Equalization;

public class UserDto {

	@Equalization(name = "name")
	public String name;

	@Equalization(name = "surname")
	public String surname;

	@Equalization(name = "phone")
	public String phone;

	@Equalization(name = "email")
	public String email;

	@Equalization(name = "password")
	public String password;

	public String passwordConfirm;

	@Equalization(name = "admin_flag")
	public Boolean admin;

	@Equalization(name = "enable")
	public Boolean enable;

	@Equalization(name = "id")
	public Integer id;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void encrypt() {
		this.password = EncryptorResources.encrypt(password);
	}

}