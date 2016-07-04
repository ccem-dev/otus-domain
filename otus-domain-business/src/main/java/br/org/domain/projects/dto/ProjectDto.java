package br.org.domain.projects.dto;

import br.org.tutty.Equalization;

public class ProjectDto {

	@Equalization(name = "projectRestUrl")
	private String projectRestUrl;

	@Equalization(name = "projectName")
	private String projectName;

	@Equalization(name = "projectToken")
	private String projectToken;
	
	public String getProjectRestUrl() {
		return projectRestUrl;
	}

	public String getName() {
		return projectName;
	}

	public void setProjectToken(String projectToken) {
		this.projectToken = projectToken;
	}

	public void setProjectRestUrl(String projectRestUrl) {
		this.projectRestUrl = projectRestUrl;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectToken() {
		return projectToken;
	}	
	
}
