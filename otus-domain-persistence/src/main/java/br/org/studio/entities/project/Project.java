package br.org.studio.entities.project;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import br.org.tutty.Equalization;

@Entity
@Table(name = "project", schema = "public")
@SequenceGenerator(name = "projectSequence", sequenceName = "project_seq", initialValue = 1, allocationSize = 1)
public class Project implements Serializable{
	private static final long serialVersionUID = -1807240220640971276L;

	@Id
	@GeneratedValue(generator = "projectSequence", strategy = GenerationType.SEQUENCE)
	private Long id;

	@Equalization(name = "projectUrl")
	@NotNull
	private String projectUrl;

	@Equalization(name = "projectName")
	@NotNull
	private String projectName;

	@Equalization(name = "token")
	@NotNull
	private String token;
	
	public Project(){}

	public Project(String projectUrl, String projectName, String token) {
		this.projectUrl = projectUrl;
		this.projectName = projectName;
		this.token = token;
	}

	public String getUrl() {
		return projectUrl;
	}

	public String getName() {
		return projectName;
	}

	public String getToken() {
		return token;
	}

}
