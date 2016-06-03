package br.org.domain.system.dao;

import javax.ejb.Stateless;

import br.org.domain.dao.GenericDao;
import br.org.domain.email.EmailSender;
import br.org.domain.exceptions.DataNotFoundException;

@Stateless
public interface SystemConfigDao extends GenericDao {
    Boolean isReady();

	EmailSender findEmailSender() throws DataNotFoundException;
}
