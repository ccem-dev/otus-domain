package br.org.domain.projects;

import br.org.tutty.Equalization;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "project", schema = "public")
@SequenceGenerator(name = "projectSequence", sequenceName = "project_seq", initialValue = 1, allocationSize = 1)
public class Project implements Serializable{
	private static final long serialVersionUID = -1807240220640971276L;

	@Id
	@GeneratedValue(generator = "projectSequence", strategy = GenerationType.SEQUENCE)
	private Long id;

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
