package br.com.studio.security.service;

import static org.hamcrest.CoreMatchers.instanceOf;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import br.org.domain.security.PasswordGenerator;

public class PasswordGeneratorTest {

	private static final int LENGTH_PASSWORD = 8;
	private String randomPassword;

	@Before
	public void setUp() {
		randomPassword = PasswordGenerator.generateRandom();
	}

	@Test
	public void generateRandom_should_generate_a_string_with_eight_characters() {
		Assert.assertEquals(LENGTH_PASSWORD, randomPassword.length());
	}

	@Test
	public void generateRandom_should_return_a_type_string() {
		Assert.assertThat(randomPassword, instanceOf(String.class));
	}

	@Test
	public void generateRandom_should_generate_a_string() {
		Assert.assertNotNull(randomPassword);
	}

}
