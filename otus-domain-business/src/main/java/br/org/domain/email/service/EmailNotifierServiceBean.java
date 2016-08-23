package br.org.domain.email.service;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.email.StudioEmail;
import br.org.domain.email.WelcomeNotificationEmail;
import br.org.domain.security.EncryptorResources;
import br.org.domain.system.dao.SystemConfigDao;
import br.org.owail.io.TemplateReader;
import br.org.owail.sender.email.Sender;
import br.org.owail.sender.gmail.GMailer;
import br.org.domain.email.EmailSender;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.email.dto.EmailSenderDto;

@Stateless
public class EmailNotifierServiceBean implements EmailNotifierService {

    @Inject
    private SystemConfigDao systemConfigDao;

    @Override
    @Asynchronous
    public void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException {
        GMailer mailer = GMailer.createTLSMailer();

        mailer.setFrom(email.getFrom());
        mailer.addRecipients(email.getRecipients());
        mailer.setSubject(email.getSubject());
        mailer.setContentType(email.getContentType());
        mailer.setContent(mergeTemplate(email.getContentDataMap(), email.getTemplatePath()));

        try {
            mailer.send();
        } catch (Exception e) {
            throw new EmailNotificationException(e);
        }
    }

    @Override
    public Sender getSender() throws DataNotFoundException, UnsupportedEncodingException {
        EmailSender emailSender = systemConfigDao.findEmailSender();
        return new Sender(emailSender.getName(), emailSender.getEmailAddress(), EncryptorResources.decrypt(emailSender.getPassword()));

    }

    @Override
    public void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException {
        Sender sender = new Sender(emailSenderDto.getName(), emailSenderDto.getEmail(), emailSenderDto.getPassword());

        WelcomeNotificationEmail welcomeNotificationEmail = new WelcomeNotificationEmail();
        welcomeNotificationEmail.defineRecipient(emailSenderDto.getEmail());
        welcomeNotificationEmail.setFrom(sender);
        sendEmail(welcomeNotificationEmail);
    }

    private String mergeTemplate(Map<String, String> dataMap, String template) {
        TemplateReader templateReader = new TemplateReader();
        String templateContent = templateReader.getFileToString(getClass().getClassLoader(), template);
        return templateReader.fillTemplate(dataMap, templateContent);
    }


}
