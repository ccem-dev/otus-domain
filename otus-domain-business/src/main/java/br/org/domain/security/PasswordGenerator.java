package br.org.domain.security;

import java.util.Random;

public class PasswordGenerator {

	private static int LENGTH = 8;

	public static String generateRandom() {
		Random random = new Random();
		char[] digits = new char[LENGTH];
		digits[0] = (char) (random.nextInt(9) + '1');
		for (int i = 1; i < LENGTH; i++) {
			digits[i] = (char) (random.nextInt(10) + '0');
		}
		return new String(digits);
	}

}
