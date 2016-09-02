package br.org.domain.repository.dto;

import br.org.domain.exception.bussiness.EncryptedException;
import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
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

    private RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor;

    private byte[] encode;

    public RepositoryDto() {
    }

    public RepositoryDto(RepositoryConnectionDataDescriptor repositoryConnectionDataDescriptor) {
        this.repositoryConnectionDataDescriptor = repositoryConnectionDataDescriptor;
    }

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
        return password;
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
        return (database != null && !database.isEmpty())
                && (host != null && !host.isEmpty())
                && (port != null && !port.isEmpty())
                && (username != null && !username.isEmpty())
                && (password != null && !password.isEmpty());
    }

    @Override
    public void encrypt() throws EncryptedException {
        if (password != null) {
            this.password = EncryptorResources.encryptReversible(password);
        }
    }

    public void decrypt() {
        if (password != null) {
            this.password = EncryptorResources.decrypt(password);
        }
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public void setPort(String port) {
        this.port = port;
    }
}
