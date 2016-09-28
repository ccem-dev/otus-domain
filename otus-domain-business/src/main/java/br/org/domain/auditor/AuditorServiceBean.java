package br.org.domain.auditor;

import br.org.domain.auditor.dto.LogEntryDto;
import br.org.tutty.Equalizer;

import javax.ejb.Asynchronous;
import javax.ejb.Schedule;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class AuditorServiceBean implements AuditorService {
    @Inject
    private AuditorDao auditorDao;

    @Inject
    private AuditorContext auditorContext;

    @Override
    @Asynchronous
    public void log(LogEntryDto logEntryDto) {
        LogEntry logEntry = new LogEntry();

        Equalizer.equalize(logEntryDto, logEntry);
        auditorContext.addLogEntry(logEntry);
    }

    @Schedule(hour = "*/1", info = "Persist Auditor Log")
    public void persist() {
        Auditor auditor = auditorContext.getAuditor();
        if (!auditor.isEmpty()) {
            auditorDao.merge(auditor);
            auditorContext.init();
        }
    }
}

