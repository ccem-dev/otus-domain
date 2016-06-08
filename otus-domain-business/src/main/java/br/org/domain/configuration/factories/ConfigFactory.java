package br.org.domain.configuration.factories;

import br.org.domain.email.EmailSender;
import br.org.domain.system.SystemConfig;
import br.org.domain.exception.FillEmailSenderException;
import br.org.domain.email.dto.EmailSenderDto;
import br.org.tutty.Equalizer;

public class ConfigFactory {
	
	public static SystemConfig buildConfigEmailSender(EmailSenderDto emailSenderDto) throws FillEmailSenderException, IllegalAccessException, NoSuchFieldException {
		try{
			EmailSender emailSender = new EmailSender();			
			Equalizer.equalize(emailSenderDto, emailSender);
			
			return new SystemConfig(emailSender);
		} catch(IllegalAccessException | NoSuchFieldException e){
			throw new FillEmailSenderException();
		}
	}
}
