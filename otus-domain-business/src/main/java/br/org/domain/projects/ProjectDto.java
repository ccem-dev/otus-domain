package br.org.domain.projects;

import br.org.tutty.Equalization;

public class ProjectDto {

	@Equalization(name = "projectRestUrl")
	private String projectRestUrl;

	@Equalization(name = "projectName")
	private String projectName;

	@Equalization(name = "projectToken")
	private String projectToken;
	
	public ProjectDto(String projectRestUrl, String projectName, String projectToken){
		this.projectRestUrl = projectRestUrl;
		this.projectName = projectName;
		this.projectToken = projectToken;
	}

	public ProjectDto() {
	}

	public String getProjectRestUrl() {
		return projectRestUrl;
	}

	public String getName() {
		return projectName;
	}

	public String getProjectToken() {
		return projectToken;
	}	
	
}
