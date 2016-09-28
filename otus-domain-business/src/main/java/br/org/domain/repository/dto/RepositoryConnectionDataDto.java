package br.org.domain.repository.dto;

import br.org.domain.rest.Dto;
import br.org.domain.security.EncryptorResources;
import br.org.studio.tool.base.repository.RepositoryConnectionDataDescriptor;
import br.org.tutty.Equalization;

public class RepositoryConnectionDataDto implements RepositoryConnectionDataDescriptor, Dto {
    @Equalization(name = "database_name")
    private String database;

    @Equalization(name = "database_port")
    private String port;

    @Equalization(name = "database_host")
    private String host;

    @Equalization(name = "database_password")
    private String password;

    @Equalization(name = "database_username")
    private String username;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public Boolean isValid() {
        return (database != null && !database.isEmpty()) &&
                (port != null && !port.isEmpty()) &&
                (host != null && !host.isEmpty())
                ? Boolean.TRUE : Boolean.FALSE;
    }

    @Override
    public void encrypt() {
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

    public void setPort(String port) {
        this.port = port;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDatabase() {
        return database;
    }

    @Override
    public String getPort() {
        return port;
    }

    @Override
    public String getHost() {
        return host;
    }

    @Override
    public String getPassword() {
        return password;
    }
}
