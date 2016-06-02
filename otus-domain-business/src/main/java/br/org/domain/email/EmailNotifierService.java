package br.org.domain.email;

import br.org.owail.sender.email.Sender;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.rest.dtos.EmailSenderDto;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException;

    Sender getSender() throws DataNotFoundException;

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException;
}
