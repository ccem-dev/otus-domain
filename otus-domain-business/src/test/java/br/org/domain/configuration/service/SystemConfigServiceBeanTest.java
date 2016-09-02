package br.org.domain.configuration.service;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.configuration.factories.SystemConfigFactory;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.system.RepositoryConnectionData;
import br.org.domain.system.SystemConfig;
import br.org.domain.system.dao.SystemConfigDao;
import br.org.domain.user.api.UserFacade;
import br.org.domain.user.dto.UserDto;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import javax.persistence.NoResultException;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SystemConfigFactory.class, SystemConfigServiceBean.class})
public class SystemConfigServiceBeanTest {
    private static String USER_EMAIL = "email@email";

    @InjectMocks
    private SystemConfigServiceBean systemConfigServiceBean;

    @Mock
    private EmailNotifierService emailNotifierService;

    @Mock
    private SystemConfigDao systemConfigDao;

    @Mock
    private UserFacade userFacade;

    @Mock
    private SystemConfig systemConfig;

    @Mock
    private RepositoryConnectionData repositoryConnection;

    @Mock
    private EmailSenderDto emailSenderDto;

    @Mock
    private SystemConfigDto systemConfigDto;

    @Mock
    private UserDto userDto;

    @Test
    public void method_isReady_should_calls_a_database_to_check_if_the_system_is_ready() {
        systemConfigServiceBean.isReady();
        Mockito.verify(systemConfigDao).isReady();
    }

    @Test(expected = DataNotFoundException.class)
    public void method_fetchRepositoryConnectionData_should_throw_DataNotFound_when_NoResultException() throws DataNotFoundException {
        Mockito.when(systemConfigDao.fetch()).thenThrow(NoResultException.class);
        systemConfigServiceBean.fetchRepositoryConnectionData();
    }

    @Test
    public void method_fetchRepositoryConnectionData_should_call_systemConfigDao() throws DataNotFoundException {
        Mockito.when(systemConfigDao.fetch()).thenReturn(systemConfig);
        Mockito.when(systemConfig.getRepositoryConnectionData()).thenReturn(repositoryConnection);
        systemConfigServiceBean.fetchRepositoryConnectionData();
        Mockito.verify(systemConfigDao).fetch();
    }

    @Test
    public void method_validateEmailService_should_return_True_when_send_email() {
        Boolean result = systemConfigServiceBean.validateEmailService(emailSenderDto);
        Assert.assertTrue(result);
    }

    @Test
    public void method_validateEmailService_should_return_false_when_dont_send_email() throws EmailNotificationException {
        Mockito.doThrow(new EmailNotificationException()).when(emailNotifierService).sendWelcomeEmail(emailSenderDto);
        Boolean result = systemConfigServiceBean.validateEmailService(emailSenderDto);
        Assert.assertFalse(result);
    }

    @Test(expected = ValidationException.class)
    public void method_create_should_verify_if_dto_isValid_and_throw_ValidationException() throws EmailNotificationException, AlreadyExistException, ValidationException {
        Mockito.when(systemConfigDto.isValid()).thenReturn(Boolean.FALSE);
        systemConfigServiceBean.create(systemConfigDto);
        Mockito.verify(systemConfigDto).isValid();
    }

    @Test(expected = AlreadyExistException.class)
    public void method_create_should_verify_if_system_is_ready() throws EmailNotificationException, AlreadyExistException, ValidationException {
        Mockito.when(systemConfigDto.isValid()).thenReturn(Boolean.TRUE);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.TRUE);
        systemConfigServiceBean.create(systemConfigDto);
        Mockito.verify(systemConfigDao).isReady();
    }

    @Test(expected = EmailNotificationException.class)
    public void method_create_should_verify_if_email_service_is_valid() throws EmailNotificationException, AlreadyExistException, ValidationException {
        Mockito.when(systemConfigDto.isValid()).thenReturn(Boolean.TRUE);
        Mockito.when(systemConfigDto.getEmailSender()).thenReturn(emailSenderDto);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);
        Mockito.doThrow(new EmailNotificationException()).when(emailNotifierService).sendWelcomeEmail(emailSenderDto);
        systemConfigServiceBean.create(systemConfigDto);
    }

    @Test
    public void method_create_should_persist_data() throws EmailNotificationException, AlreadyExistException, ValidationException {
        PowerMockito.mockStatic(SystemConfigFactory.class);
        Mockito.when(systemConfigDto.isValid()).thenReturn(Boolean.TRUE);
        Mockito.when(systemConfigDto.getEmailSender()).thenReturn(emailSenderDto);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);
        Mockito.when(systemConfigDto.getUser()).thenReturn(userDto);
        Mockito.when(userDto.getEmail()).thenReturn(USER_EMAIL);
        Mockito.when(SystemConfigFactory.build(systemConfigDto)).thenReturn(systemConfig);

        systemConfigServiceBean.create(systemConfigDto);
        Mockito.verify(systemConfigDao).persist(systemConfig);
    }

    @Test
    public void method_create_should_create_user_and_enable() throws EmailNotificationException, AlreadyExistException, ValidationException {
        PowerMockito.mockStatic(SystemConfigFactory.class);
        Mockito.when(systemConfigDto.isValid()).thenReturn(Boolean.TRUE);
        Mockito.when(systemConfigDto.getEmailSender()).thenReturn(emailSenderDto);
        Mockito.when(systemConfigDao.isReady()).thenReturn(Boolean.FALSE);
        Mockito.when(systemConfigDto.getUser()).thenReturn(userDto);
        Mockito.when(userDto.getEmail()).thenReturn(USER_EMAIL);
        Mockito.when(SystemConfigFactory.build(systemConfigDto)).thenReturn(systemConfig);

        systemConfigServiceBean.create(systemConfigDto);
        Mockito.verify(userFacade).create(systemConfigDto);
        Mockito.verify(userFacade).enable(USER_EMAIL);
    }
}
