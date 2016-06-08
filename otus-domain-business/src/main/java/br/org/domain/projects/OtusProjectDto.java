package br.org.domain.projects;

import br.org.tutty.Equalization;

public class OtusProjectDto {

	@Equalization(name = "projectRestUrl")
	private String projectRestUrl;

	@Equalization(name = "projectName")
	private String projectName;

	@Equalization(name = "token")
	private String token;
	
	public OtusProjectDto(String projectRestUrl, String projectName, String token){
		this.projectRestUrl = projectRestUrl;
		this.projectName = projectName;
		this.token = token;
	}

	public String getProjectRestUrl() {
		return projectRestUrl;
	}

	public String getName() {
		return projectName;
	}

	public String getToken() {
		return token;
	}	
	
}
