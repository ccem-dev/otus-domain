package br.org.domain.configuration.dto;

import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.rest.Dto;
import br.org.domain.user.dto.UserDto;

public class SystemConfigDto implements Dto {
    private UserDto user;
    private EmailSenderDto emailSender;
    private RepositoryConnectionDataDto repositoryConnection;

    @Override
    public Boolean isValid() {
        return user.isValid() && emailSender.isValid() && repositoryConnection.isValid();
    }

    @Override
    public void encrypt() {
        user.encrypt();
        emailSender.encrypt();
        repositoryConnection.encrypt();
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public void setEmailSender(EmailSenderDto emailSender) {
        this.emailSender = emailSender;
    }

    public void setRepositoryConnection(RepositoryConnectionDataDto repositoryConnection) {
        this.repositoryConnection = repositoryConnection;
    }

    public UserDto getUser() {
        return user;
    }

    public EmailSenderDto getEmailSender() {
        return emailSender;
    }

    public RepositoryConnectionDataDto getRepositoryConnection() {
        return repositoryConnection;
    }
}
