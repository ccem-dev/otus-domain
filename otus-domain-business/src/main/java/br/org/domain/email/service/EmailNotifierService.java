package br.org.domain.email.service;

import br.org.domain.email.StudioEmail;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.domain.exception.bussiness.EmailNotificationException;
import br.org.owail.sender.email.Sender;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException;

    Sender getSender();

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException;
}
