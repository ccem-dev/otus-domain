package br.org.studio.utils;

import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;

public class UuidUtilsTest {

	@Test
	public void verify_UUID_bytes_can_be_reconstructed_back_to_original_UUID() {
		UUID u = UUID.randomUUID();
		byte[] uBytes = UuidUtils.asBytes(u);
		UUID u2 = UuidUtils.asUuid(uBytes);
		Assert.assertEquals(u, u2);
	}

	@Test
	public void verify_name_UUID_from_bytes_method_does_not_recreate_original_UUID() {
		UUID u = UUID.randomUUID();
		byte[] uBytes = UuidUtils.asBytes(u);
		UUID u2 = UUID.nameUUIDFromBytes(uBytes);
		Assert.assertNotEquals(u, u2);
	}

}
