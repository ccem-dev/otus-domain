package br.org.domain.projects;

import br.org.domain.dao.GenericDao;
import br.org.domain.exceptions.DataNotFoundException;

import javax.ejb.Stateless;
import java.util.List;


@Stateless
public interface ProjectDao extends GenericDao{

    public List<Project> fetchAll() throws DataNotFoundException;
}
