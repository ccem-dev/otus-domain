package br.org.studio.rest;

import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.google.gson.Gson;

import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityServiceBean;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationUsersResourceTest {
    private static final String EMAIL_INVALID = "email";
    private static final String PASSWORD_INVALID = "password";

    @InjectMocks
    private AuthenticationResource authenticationResource;
    
    @Mock
    private SecurityServiceBean securityServiceBean;

	private UUID uuid;
    
    @Before
    public void setUp(){
    	uuid = UUID.randomUUID();
    }

    @Test
    public void userLogin_shold_return_FALSE_when_throw_any_exception() throws EmailNotFoundException, InvalidPasswordException, UserDisabledException {
        Mockito.doThrow(new EmailNotFoundException()).when(securityServiceBean).authenticate(Matchers.any(LoginAuthenticationDto.class));

        LoginAuthenticationDto loginAuthenticationDto = new LoginAuthenticationDto();
        loginAuthenticationDto.setEmail(EMAIL_INVALID);
        loginAuthenticationDto.setPassword(PASSWORD_INVALID);

        loginAuthenticationDto.encryptPassword();

        String result = authenticationResource.userLogin(new Gson().toJson(loginAuthenticationDto));
        
        Response response = new Gson().fromJson(result, Response.class);

        Assert.assertEquals(Boolean.TRUE, response.hasErrors());
        Assert.assertEquals("Falha na autenticação.", response.getError());
    }

    @Test
    public void userLogin_should_return_a_UUID_when_dont_throw_any_exception() throws InvalidPasswordException, EmailNotFoundException, UserDisabledException {
        LoginAuthenticationDto loginAuthenticationDto = new LoginAuthenticationDto();
        loginAuthenticationDto.setEmail(EMAIL_INVALID);
        loginAuthenticationDto.setPassword(PASSWORD_INVALID);

        Mockito.when(securityServiceBean.authenticate(Matchers.any())).thenReturn(uuid);
        
        loginAuthenticationDto.encryptPassword();

        String result = authenticationResource.userLogin(new Gson().toJson(loginAuthenticationDto));
        Response response = new Gson().fromJson(result, Response.class);
        
        Assert.assertNotNull(response.getData());
        Assert.assertEquals(null, response.getError());
        
    }

    @Test
    public void isLogged_should_return_TRUE_when_user_is_authenticated(){
        Mockito.when(securityServiceBean.isLogged(Matchers.any(HttpSession.class))).thenReturn(Boolean.TRUE);

        String result = authenticationResource.isLogged();

        Assert.assertEquals(Boolean.TRUE, new Gson().fromJson(result, Response.class).getData());
    }

    @Test
    public void isLogged_should_return_FALSE_when_user_is_dont_authenticated(){
        Mockito.when(securityServiceBean.isLogged(Matchers.any(HttpSession.class))).thenReturn(Boolean.FALSE);

        String result = authenticationResource.isLogged();

        Assert.assertEquals(Boolean.FALSE, new Gson().fromJson(result, Response.class).getData());
    }
}
