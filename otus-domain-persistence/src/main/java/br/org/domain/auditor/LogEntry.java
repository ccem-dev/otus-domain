package br.org.domain.auditor;

import br.org.tutty.Equalization;

import javax.persistence.*;
import java.util.Date;

@Embeddable
public class LogEntry {

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

    @Equalization(name = "token")
    private String token;
}

