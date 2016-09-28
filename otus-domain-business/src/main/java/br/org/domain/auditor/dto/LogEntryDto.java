package br.org.domain.auditor.dto;

import br.org.tutty.Equalization;

import java.util.Date;
import java.util.Map;

public class LogEntryDto {

    @Equalization(name = "date")
    private Date date;

    @Equalization(name = "ip")
    private String ip;

    @Equalization(name = "restURL")
    private String restURL;

    @Equalization(name = "body")
    private String body;

    @Equalization(name = "userId")
    private String userId;

    @Equalization(name = "params")
    private Map<String, String[]> params;

    @Equalization(name = "token")
    private String token;

    public LogEntryDto(String ip, String restURL, String body, String userId, Map<String, String[]> params, String token) {
        this.ip = ip;
        this.restURL = restURL;
        this.body = body;
        this.userId = userId;
        this.params = params;
        this.token = token;
        this.date = new Date();
    }
}

