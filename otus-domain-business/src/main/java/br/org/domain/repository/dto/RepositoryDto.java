package br.org.domain.repository.dto;

import br.org.domain.exception.EncryptedException;
import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
import br.org.domain.user.User;
import br.org.studio.tool.base.repository.RepositoryConnectionDataDescriptor;
import br.org.studio.tool.base.repository.RepositoryDescriptor;
import br.org.tutty.Equalization;

public class RepositoryDto implements RepositoryDescriptor, Dto {

    @Equalization(name = "database")
    private String database;

    @Equalization(name = "host")
    private String host;

    @Equalization(name = "port")
    private String port;

    @Equalization(name = "username")
    private String username;

    @Equalization(name = "password")
    private String password;

    @Equalization(name = "user")
    private User user;

    private RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor;

    private byte[] encode;

    @Override
    public String getDatabaseName() {
        return database;
    }

    public String getHostName() {
        return host;
    }

    public String getPort() {
        return port;
    }

    @Override
    public String getUserName() {
        return username;
    }

    @Override
    public String getPassword() {
        return EncryptorResources.decrypt(password);
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public RepositoryConnectionDataDescriptor getRepositoryConnectionDataDescriptor() {
        return repositoryConnectionDataDescriptor;
    }

    public void setRepositoryConnectionDataDescriptor(
            RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor) {
        this.repositoryConnectionDataDescriptor = repositoryConnectionDataDescriptor;
    }

    @Override
    public Boolean isValid() {
        return Boolean.TRUE;
    }

    @Override
    public void encrypt() throws EncryptedException {
        this.password = EncryptorResources.encryptReversible(password);
    }

}
