package br.org.domain.dao;

import javax.ejb.Local;

import br.org.domain.entities.system.SystemConfig;
import br.org.domain.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.org.domain.entities.email.EmailSender;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Local(SystemConfigDao.class)
public class SystemConfigDaoBean extends GenericDaoBean implements SystemConfigDao{

    public Boolean isReady(){
        Criteria criteria = createCriteria(SystemConfig.class);

        criteria.add(Restrictions.eq("ready", true));

        try {
            uniqueResultNotWaitingEmpty(criteria);
            return true;

        } catch (DataNotFoundException e) {
            return false;
        }
    }
    
    @Override
	public EmailSender findEmailSender() throws DataNotFoundException {
		Criteria query = createCriteria(SystemConfig.class);
		SystemConfig systemConfig = (SystemConfig) uniqueResultNotWaitingEmpty(query);
		return systemConfig.getEmailSender();
	}
}
