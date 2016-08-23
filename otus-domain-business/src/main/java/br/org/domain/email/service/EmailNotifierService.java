package br.org.domain.email.service;

import br.org.domain.email.StudioEmail;
import br.org.owail.sender.email.Sender;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.email.dto.EmailSenderDto;

import java.io.UnsupportedEncodingException;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException;

    Sender getSender() throws DataNotFoundException, UnsupportedEncodingException;

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException;
}
