package br.org.domain.log;

import java.util.regex.Pattern;

public class BodyLog {
    private static String REGEX_PASSWORD = "\"(?i)(password|pwd|passwordConfirmation)\":\"[\\w\\p{Punct}&&[^&]]*?\"";
    private String body;

    public BodyLog(String body) {
        this.body = body;
    }

    public String getBody(){
        return maskingSensitiveData(body);
    }

    private String maskingSensitiveData(String body){
        Pattern compile = Pattern.compile(REGEX_PASSWORD);
        return compile.matcher(body).replaceAll("\"$1\":\"XXXXXXXXXXXXXXXX\"");
    }
}
