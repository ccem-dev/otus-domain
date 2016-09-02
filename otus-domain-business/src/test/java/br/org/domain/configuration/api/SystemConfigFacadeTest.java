package br.org.domain.configuration.api;

import br.org.domain.configuration.dto.SystemConfigDto;
import br.org.domain.configuration.service.SystemConfigService;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.exception.bussiness.AlreadyExistException;
import br.org.domain.exception.bussiness.DataNotFoundException;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.domain.exception.bussiness.ValidationException;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.response.builder.ResponseBuilder;
import br.org.domain.response.exception.HttpResponseException;
import br.org.domain.response.exception.ResponseInfo;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SystemConfigFacadeTest {

    @InjectMocks
    private SystemConfigFacade systemConfigFacade;

    @Mock
    private SystemConfigService systemConfigService;

    @Mock
    private RepositoryConnectionDataDto repositoryConnectionDataDto;

    @Mock
    private EmailSenderDto emailSenderDto;

    @Mock
    private SystemConfigDto systemConfigDto;

    @Test
    public void method_fetchRepositoryConnectionData_should_call_service() throws DataNotFoundException {
        systemConfigFacade.fetchRepositoryConnectionData();
        Mockito.verify(systemConfigService).fetchRepositoryConnectionData();
    }

    @Test
    public void method_fetchRepositoryConnectionData_should_return_connection() throws DataNotFoundException {
        Mockito.when(systemConfigService.fetchRepositoryConnectionData()).thenReturn(repositoryConnectionDataDto);
        RepositoryConnectionDataDto repositoryConnectionDataDto = systemConfigFacade.fetchRepositoryConnectionData();
        Assert.assertEquals(this.repositoryConnectionDataDto, repositoryConnectionDataDto);

    }

    @Test(expected = HttpResponseException.class)
    public void method_fetchRepositoryConnection_should_throw_HttpResponse_when_NotFound() throws DataNotFoundException {
        ResponseInfo responseInfo = ResponseBuilder.System.NotInitialized.build();
        Mockito.when(systemConfigService.fetchRepositoryConnectionData()).thenThrow(DataNotFoundException.class);

        try{
            systemConfigFacade.fetchRepositoryConnectionData();
        }catch (HttpResponseException e){
            Assert.assertEquals(responseInfo.MESSAGE, e.getResponseInfo().MESSAGE);
            throw e;
        }
    }

    @Test
    public void method_isReady_should_call_service(){
        systemConfigFacade.isReady();
        Mockito.verify(systemConfigService).isReady();
    }

    @Test
    public void method_validateEmailService_should_call_service(){
        systemConfigFacade.validateEmailService(emailSenderDto);
        Mockito.verify(systemConfigService).validateEmailService(emailSenderDto);
    }

    @Test
    public void method_create_should_call_service() throws EmailNotificationException, AlreadyExistException, ValidationException {
        systemConfigFacade.create(systemConfigDto);
        Mockito.verify(systemConfigService).create(systemConfigDto);
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_HttResponse_when_validationException() throws EmailNotificationException, AlreadyExistException, ValidationException {
        ResponseInfo responseInfo = ResponseBuilder.Security.Validation.build();
        PowerMockito.doThrow(new ValidationException()).when(systemConfigService).create(systemConfigDto);

        try{
            systemConfigFacade.create(systemConfigDto);
        }catch (HttpResponseException e){
            Assert.assertEquals(responseInfo.MESSAGE, e.getResponseInfo().MESSAGE);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_HttResponse_when_emailNotificationException() throws EmailNotificationException, AlreadyExistException, ValidationException {
        ResponseInfo responseInfo = ResponseBuilder.Email.HttpCommunication.build();
        PowerMockito.doThrow(new EmailNotificationException()).when(systemConfigService).create(systemConfigDto);

        try{
            systemConfigFacade.create(systemConfigDto);
        }catch (HttpResponseException e){
            Assert.assertEquals(responseInfo.MESSAGE, e.getResponseInfo().MESSAGE);
            throw e;
        }
    }

    @Test(expected = HttpResponseException.class)
    public void method_create_should_throw_HttResponse_when_alreadyExistException() throws EmailNotificationException, AlreadyExistException, ValidationException {
        ResponseInfo responseInfo = ResponseBuilder.Common.AlreadyExist.build();
        PowerMockito.doThrow(new AlreadyExistException()).when(systemConfigService).create(systemConfigDto);

        try{
            systemConfigFacade.create(systemConfigDto);
        }catch (HttpResponseException e){
            Assert.assertEquals(responseInfo.MESSAGE, e.getResponseInfo().MESSAGE);
            throw e;
        }
    }
}
