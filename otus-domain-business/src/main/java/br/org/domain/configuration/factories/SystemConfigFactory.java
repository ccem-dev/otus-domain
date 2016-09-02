package br.org.domain.configuration.factories;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.email.EmailSender;
import br.org.domain.system.RepositoryConnectionData;
import br.org.domain.system.SystemConfig;
import br.org.tutty.Equalizer;

public class SystemConfigFactory {

    public static SystemConfig build(SystemConfigDto systemConfigDto){
        EmailSender emailSender = new EmailSender();
        Equalizer.equalize(systemConfigDto.getEmailSender(), emailSender);

        RepositoryConnectionData repositoryConnectionData = new RepositoryConnectionData();
        Equalizer.equalize(systemConfigDto.getRepositoryConnection(), repositoryConnectionData);

        return new SystemConfig(emailSender, repositoryConnectionData);
    }
}
