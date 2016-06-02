package br.org.domain.dao;

import javax.ejb.Stateless;

import br.org.domain.entities.email.EmailSender;
import br.org.domain.exceptions.DataNotFoundException;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Stateless
public interface SystemConfigDao extends GenericDao {
    Boolean isReady();

	EmailSender findEmailSender() throws DataNotFoundException;
}
