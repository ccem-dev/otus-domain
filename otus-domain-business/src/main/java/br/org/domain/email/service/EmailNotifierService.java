package br.org.domain.email.service;

import br.org.domain.email.StudioEmail;
import br.org.owail.sender.email.Sender;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.email.dto.EmailSenderDto;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException;

    Sender getSender() throws DataNotFoundException;

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException;
}
