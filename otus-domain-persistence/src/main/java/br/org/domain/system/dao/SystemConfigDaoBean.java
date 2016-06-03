package br.org.domain.system.dao;

import javax.ejb.Local;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.system.SystemConfig;
import br.org.domain.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.org.domain.email.EmailSender;

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
