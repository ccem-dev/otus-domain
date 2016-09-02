package br.org.domain.email.validation;

import br.org.domain.user.dao.UserDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.mockito.Matchers.anyString;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(MockitoJUnitRunner.class)
public class EmailConstraintTest {

	@Mock
	private UserDao dao;

	@InjectMocks
	private EmailConstraint emailConstraint;

	@Test
	public void isUnique_method_should_return_TRUE_when_the_email_already_exist_in_the_list() {
		when(dao.emailExists(anyString())).thenReturn(false);

		Boolean verificationResult = emailConstraint.isUnique(anyString());

		assertThat(verificationResult, equalTo(true));
	}

	@Test
	public void isUnique_method_should_return_FALSE_when_the_email_does_not_exist_in_the_list() {
		when(dao.emailExists(anyString())).thenReturn(true);

		Boolean verificationResult = emailConstraint.isUnique(anyString());

		assertThat(verificationResult, equalTo(false));
	}

}
