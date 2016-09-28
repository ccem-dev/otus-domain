package br.org.domain.projects;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Project{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Type(type = "objectid")
	private String id;

	@Equalization(name = "projectRestUrl")
	@NotNull
	private String projectRestUrl;

	@Equalization(name = "projectName")
	@NotNull
	private String projectName;

	@Equalization(name = "projectToken")
	@NotNull
	private String projectToken;
	
	public Project(){}

	public String getName() {
		return projectName;
	}

	public String getProjectToken() {
		return projectToken;
	}
}
