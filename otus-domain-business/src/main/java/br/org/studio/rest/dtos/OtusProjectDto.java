package br.org.studio.rest.dtos;

public class OtusProjectDto {
	
	private String projectUrl;
	
	private String projectName;
	
	private String token;
	
	public OtusProjectDto(String projectUrl, String projectName, String token){
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
