package br.org.domain.security;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import br.org.domain.exception.EncryptedException;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class EncryptorResources {

	public static String encryptIrreversible(String value) throws EncryptedException {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA");
			byte[] digest = messageDigest.digest(value.getBytes());

			return (new BASE64Encoder()).encode(digest);
		} catch (NoSuchAlgorithmException exception) {
			exception.printStackTrace();
			throw new EncryptedException(exception);
		}
	}

	public static String encryptReversible(String value) throws UnsupportedEncodingException {
		byte [] valueBytes = value.getBytes();
		byte[] encryptedArray = Base64.getEncoder().encode(valueBytes);
		return new String(encryptedArray, "UTF-8");
	}

	public static String decrypt(String value) throws UnsupportedEncodingException {
		byte [] valueBytes= value.getBytes();
		byte[] encryptedArray = Base64.getDecoder().decode(valueBytes);
		return new String(encryptedArray, "UTF-8");
	}
}
