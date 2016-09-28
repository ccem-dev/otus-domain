package br.org.domain.configuration.factories;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.system.SystemConfig;
import br.org.tutty.Equalizer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Equalizer.class})
public class SystemConfigFactoryTest {

    private static final String EMAIL_SENDER_NAME = "NAME";
    private static final String REPOSITORY_DATABASE = "DATABASE";
    private static final String EMAIL_SENDER_EMAIL = "EMAIL";
    private static final String EMAIL_SENDER_PASSWORD = "PASSWORD";
    private static final String REPOSITORY_PORT = "27017";
    private static final String REPOSITORY_HOST = "www.teste.com";
    private static final String REPOSITORY_PASSWORD = "PASSWORD";
    private static final String REPOSITORY_USERNAME = "USERNAME";

    private SystemConfigDto systemConfigDto;
    private EmailSenderDto emailSender;
    private RepositoryConnectionDataDto repositoryConnection;

    @Test
    public void method_build_should_return_systemConfig(){
        systemConfigDto = new SystemConfigDto();

        emailSender = new EmailSenderDto();
        emailSender.setName(EMAIL_SENDER_NAME);
        emailSender.setEmail(EMAIL_SENDER_EMAIL);
        emailSender.setPassword(EMAIL_SENDER_PASSWORD);

        repositoryConnection = new RepositoryConnectionDataDto();
        repositoryConnection.setDatabase(REPOSITORY_DATABASE);
        repositoryConnection.setPort(REPOSITORY_PORT);
        repositoryConnection.setHost(REPOSITORY_HOST);
        repositoryConnection.setPassword(REPOSITORY_PASSWORD);
        repositoryConnection.setUsername(REPOSITORY_USERNAME);

        systemConfigDto.setEmailSender(emailSender);
        systemConfigDto.setRepositoryConnection(repositoryConnection);

        SystemConfig systemConfig = SystemConfigFactory.build(systemConfigDto);
        Assert.assertEquals(systemConfig.getEmailSender().getName(), EMAIL_SENDER_NAME);
        Assert.assertEquals(systemConfig.getEmailSender().getEmailAddress(), EMAIL_SENDER_EMAIL);
        Assert.assertEquals(systemConfig.getEmailSender().getPassword(), EMAIL_SENDER_PASSWORD);
        Assert.assertEquals(systemConfig.getRepositoryConnectionData().getDatabase(), REPOSITORY_DATABASE);
        Assert.assertEquals(systemConfig.getRepositoryConnectionData().getPort(), REPOSITORY_PORT);
        Assert.assertEquals(systemConfig.getRepositoryConnectionData().getHost(), REPOSITORY_HOST);
        Assert.assertEquals(systemConfig.getRepositoryConnectionData().getPassword(), REPOSITORY_PASSWORD);
        Assert.assertEquals(systemConfig.getRepositoryConnectionData().getUsername(), REPOSITORY_USERNAME);
    }
}
