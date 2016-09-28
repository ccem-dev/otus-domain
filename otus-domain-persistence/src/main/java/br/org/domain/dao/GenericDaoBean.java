package br.org.domain.dao;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

public class GenericDaoBean {

	@PersistenceContext
	protected EntityManager em;

	public void persist(Object entity) {
		em.persist(entity);
	}

	public void merge(Object entity) {
		em.merge(entity);
	}

	public Object getSingleResult(String nativeQuery){
		return em.createNativeQuery(nativeQuery).getSingleResult();
	}

	public Object getSingleResult(String nativeQuery, Class clazz){
		return em.createNativeQuery(nativeQuery, clazz).getSingleResult();
	}

	public List getListResult(String nativeQuery, Class clazz){
		return em.createNativeQuery(nativeQuery, clazz).getResultList();
	}

	public Object notWaitingEmpty(Object entity) {
		if(entity == null){
			throw new NoResultException();
		}else {
			return entity;
		}
	}

	public Boolean exist(Class clazz){
		long count = count(clazz);
		if (count == 0){
			return Boolean.FALSE;
		}else {
			return Boolean.TRUE;
		}
	}

	public Long count(Class clazz){
		return (Long) getSingleResult(String.format("db.%s.count()", clazz.getSimpleName()));
	}

	public void update(Object object){
		em.merge(object);
	}

}
