package br.org.domain.rest;

import br.org.domain.configuration.InstallerResource;
import br.org.domain.projects.ProjectResource;
import br.org.domain.repository.RepositoryResource;
import br.org.domain.security.AuthenticationResource;
import br.org.domain.user.UserResource;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("studio")
public class EndPointsLoader extends Application {

	@Inject
	private UserResource userResource;

	@Inject
	private AuthenticationResource authenticationResource;

	@Inject
	private RepositoryResource repositoryResource;

	@Inject
	private InstallerResource installerResource;

	@Inject
	private ProjectResource projectResource;

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new HashSet<Class<?>>();
		resources.add(UserResource.class);
		resources.add(AuthenticationResource.class);
		resources.add(RepositoryResource.class);
		resources.add(InstallerResource.class);
		resources.add(ProjectResource.class);
		return resources;
	}

	@Override
	public Set<Object> getSingletons() {
		Set<Object> resources = new HashSet<Object>();
		resources.add(userResource);
		resources.add(authenticationResource);
		resources.add(repositoryResource);
		resources.add(installerResource);
		resources.add(projectResource);
		return resources;
	}

}
