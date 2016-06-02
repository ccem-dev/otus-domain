package br.org.domain.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import br.org.domain.exception.EncryptedException;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class EncryptorResources {

	public static String encrypt(String value) throws EncryptedException {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA");
			byte[] digest = messageDigest.digest(value.getBytes());

			return (new BASE64Encoder()).encode(digest);
		} catch (NoSuchAlgorithmException exception) {
			exception.printStackTrace();
			throw new EncryptedException(exception);
		}

	}
}
