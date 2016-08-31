package br.org.domain.rest;

import br.org.domain.exception.EncryptedException;

public interface Dto {
    Boolean isValid();
    void encrypt() throws EncryptedException;
}
