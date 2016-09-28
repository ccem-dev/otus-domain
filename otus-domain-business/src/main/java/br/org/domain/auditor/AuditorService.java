package br.org.domain.auditor;

import br.org.domain.auditor.dto.LogEntryDto;

public interface AuditorService {
    void log(LogEntryDto logEntryDto);
}

