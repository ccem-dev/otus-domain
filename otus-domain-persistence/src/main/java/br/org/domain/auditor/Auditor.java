package br.org.domain.auditor;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Auditor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "init")
    @NotNull
    private Date date;

    @Embedded
    @ElementCollection
    private Set<LogEntry> logEntries;

    public void addEntry(LogEntry logEntry) {
        logEntries.add(logEntry);
    }

    public void init() {
        date = new Date();
        logEntries = new HashSet<>();
    }

    public Boolean isEmpty(){
        return logEntries.isEmpty();
    }
}

