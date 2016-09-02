package br.org.studio.utils;

import br.org.domain.repository.Repository;
import br.org.domain.user.User;
import br.org.domain.utils.SurveyUUID;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class SurveyUUIDTest {

	private static final String SURVEY_UUID = "c010c008-d8b2-4a92-b1df-e84d1f4fe54a";
	
	private User user;
	private Repository repository;
	private SurveyUUID surveyUUID;

	@Before
	public void setUp() {
		user = new User();
		repository = new Repository();
		surveyUUID = new SurveyUUID(user.getUuid(), repository.getUuid(), SURVEY_UUID);
	}
	
	@Test
	public void a_new_instance_of_SurveyUUID_should_contains_a_final_key() {
		assertNotNull(surveyUUID.getEncodedSurveyfinalKey());
	}

	@Test
	public void decrypt_method_should_decrypt_correctly() {
		assertEquals(surveyUUID.toString(), surveyUUID.decrypt(surveyUUID.getEncodedSurveyfinalKey()));
	}
	
	
}
