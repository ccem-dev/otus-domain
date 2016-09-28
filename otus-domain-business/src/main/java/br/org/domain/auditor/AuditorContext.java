package br.org.domain.auditor;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class AuditorContext {
    @Inject
    private Auditor auditor;

    @PostConstruct
    public void init(){
        auditor = new Auditor();
        auditor.init();
    }

    public void addLogEntry(LogEntry logEntry){
        auditor.addEntry(logEntry);
    }

    public Auditor getAuditor() {
        return auditor;
    }
}

