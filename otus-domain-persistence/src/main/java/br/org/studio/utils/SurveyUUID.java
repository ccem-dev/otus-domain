package br.org.studio.utils;

import java.util.Base64;
import java.util.UUID;

public class SurveyUUID {

	private UUID user;
	private UUID repository;
	private String surveyUUID;
	private String encodedSurveyfinalKey;

	protected SurveyUUID() {
	}

	public SurveyUUID(UUID user, UUID repository, String surveyUUID) {
		super();
		this.user = user;
		this.repository = repository;
		this.surveyUUID = surveyUUID;
		this.encodedSurveyfinalKey = encrypt();
	}

	private String encrypt() {
		return Base64.getEncoder().encodeToString(toString().getBytes());
	}

	public String decrypt(String key) {
		byte[] decoded = Base64.getDecoder().decode(key.getBytes());
		return new String(decoded);
	}

	/**
	 * @return a concatenated encoded key
	 */
	public String getEncodedSurveyfinalKey() {
		return encodedSurveyfinalKey;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("user=[").append(user).append("]repository=[").append(repository).append("]surveyUUID=[")
				.append(surveyUUID).append("]");
		return sb.toString();
	}

}
