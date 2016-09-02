package br.org.domain.configuration.dto;

import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.security.EncryptorResources;
import br.org.domain.user.dto.UserDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SystemConfigDto.class, EncryptorResources.class, UserDto.class})
public class SystemConfigDtoTest {
    @InjectMocks
    private SystemConfigDto systemConfigDto;

    @Mock
    private EmailSenderDto emailSender;

    @Mock
    private UserDto userDto;

    @Mock
    private RepositoryConnectionDataDto repositoryConnectionDataDto;

    @Test
    public void method_encrypt_should_call_encrypt_childrens(){
        PowerMockito.mockStatic(EncryptorResources.class);
        systemConfigDto.encrypt();
        Mockito.verify(emailSender).encrypt();
        Mockito.verify(repositoryConnectionDataDto).encrypt();
        Mockito.verify(userDto).encrypt();
    }
}
