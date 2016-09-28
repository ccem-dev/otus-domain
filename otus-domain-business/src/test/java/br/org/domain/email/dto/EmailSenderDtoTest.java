package br.org.domain.email.dto;

import br.org.domain.security.EncryptorResources;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EncryptorResources.class, EmailSenderDto.class})
public class EmailSenderDtoTest {

    private static String EMAIL = "email@email";
    private static String PASSWORD = "password";
    private static String PASSWORD_ENCRYPTED = "passwordEncrypted";
    private static String NAME = "name";

    @InjectMocks
    private EmailSenderDto emailSenderDto;

    @Test
    public void method_isValid_should_return_false_when_name_is_empty(){
        emailSenderDto.setEmail(EMAIL);
        emailSenderDto.setPassword(PASSWORD);
        Assert.assertFalse(emailSenderDto.isValid());
    }

    @Test
    public void method_isValid_should_return_false_when_email_is_empty(){
        emailSenderDto.setName(NAME);
        emailSenderDto.setPassword(PASSWORD);
        Assert.assertFalse(emailSenderDto.isValid());
    }

    @Test
    public void method_isValid_should_return_false_when_password_is_empty(){
        emailSenderDto.setEmail(EMAIL);
        emailSenderDto.setName(NAME);
        Assert.assertFalse(emailSenderDto.isValid());
    }

    @Test
    public void method_isValid_should_return_true_when_password_name_and_email_filled(){
        emailSenderDto.setEmail(EMAIL);
        emailSenderDto.setName(NAME);
        emailSenderDto.setPassword(PASSWORD);
        Assert.assertTrue(emailSenderDto.isValid());
    }

    @Test
    public void method_encrypt_should_apply_reversible_password(){
        PowerMockito.mockStatic(EncryptorResources.class);
        Mockito.when(EncryptorResources.encryptReversible(PASSWORD)).thenReturn(PASSWORD_ENCRYPTED);
        emailSenderDto.setPassword(PASSWORD);
        emailSenderDto.encrypt();
        Assert.assertEquals(PASSWORD_ENCRYPTED, emailSenderDto.getPassword());
    }
}
