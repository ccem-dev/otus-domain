package br.org.domain.system.dao;

import br.org.domain.dao.GenericDaoBean;
import br.org.domain.email.EmailSender;
import br.org.domain.system.SystemConfig;

public class SystemConfigDao extends GenericDaoBean {

    public Boolean isReady() {
        return exist(SystemConfig.class);
    }

    public EmailSender findEmailSender() {
        SystemConfig systemConfig = fetch();
        return systemConfig.getEmailSender();
    }

    public SystemConfig fetch() {
        String query = String.format("db.%s.find({})", "SystemConfig", true);
        return (SystemConfig) notWaitingEmpty(getSingleResult(query, SystemConfig.class));
    }
}
