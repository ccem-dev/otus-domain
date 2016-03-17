package br.com.studio.entities.repository;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import br.org.studio.entities.repository.Repository;

public class RepositoryTest {

	private Repository repository;

	@Before
	public void setUp() {
		repository = new Repository();
	}

	@Test
	public void a_new_instance_of_REPOSITORY_must_contains_a_uuid() {
		Assert.assertNotNull("UUID should not be null", repository.getUuid());
	}

}
