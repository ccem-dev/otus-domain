package br.org.domain.rest;

import br.org.domain.rest.close.RepositoryResource;
import br.org.domain.rest.close.UserResource;
import br.org.domain.rest.open.AuthenticationResource;
import br.org.domain.rest.open.InstallerResource;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

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

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<Class<?>>();
        resources.add(UserResource.class);
        resources.add(AuthenticationResource.class);
        resources.add(RepositoryResource.class);
        resources.add(InstallerResource.class);
        return resources;
    }

    @Override
    public Set<Object> getSingletons() {
        Set<Object> resources = new HashSet<Object>();
        resources.add(userResource);
        resources.add(authenticationResource);
        resources.add(repositoryResource);
        resources.add(installerResource);
        return resources;
    }

}
