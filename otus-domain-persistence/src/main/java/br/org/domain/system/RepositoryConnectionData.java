package br.org.domain.system;

import br.org.tutty.Equalization;

import javax.persistence.Embeddable;

@Embeddable
public class RepositoryConnectionData {
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

    public String getDatabase() {
        return database;
    }

    public String getPort() {
        return port;
    }

    public String getHost() {
        return host;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }
}
