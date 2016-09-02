package br.org.domain.repository.builder;

import br.org.domain.repository.Repository;
import br.org.domain.repository.dto.RepositoryConnectionDataDto;
import br.org.domain.repository.dto.RepositoryDto;
import br.org.domain.security.PasswordGenerator;
import br.org.domain.user.User;
import br.org.tutty.Equalizer;

import java.util.ArrayList;
import java.util.List;

public class RepositoryBuilder {

    public static List<RepositoryDto> build(List<Repository> repositories){
        List<RepositoryDto> convertedRepositories = new ArrayList<>();

        repositories.stream().forEach(repository -> {
            RepositoryDto repositoryDto = new RepositoryDto();
            Equalizer.equalize(repository, repositoryDto);
            convertedRepositories.add(repositoryDto);
        });

        return convertedRepositories;
    }

    public static Repository build(RepositoryDto repositoryDto, User user){
        Repository repository = new Repository();

        repository.setUser(user);
        repository.setDatabase(user.getUuid().toString());
        repository.setUsername(user.getEmail());
        repository.setPassword(repositoryDto.getPassword());

        repository.setHost(repositoryDto.getRepositoryConnectionDataDescriptor().getHost());
        repository.setPort(repositoryDto.getRepositoryConnectionDataDescriptor().getPort());

        return repository;
    }

    public static RepositoryDto build(RepositoryConnectionDataDto repositoryConnectionDataDto, User user){
        RepositoryDto repositoryDto = new RepositoryDto(repositoryConnectionDataDto);

        repositoryDto.setDatabase(user.getUuid().toString());
        repositoryDto.setUsername(user.getEmail());
        repositoryDto.setPassword(PasswordGenerator.generateRandom());

        repositoryDto.setHost(repositoryDto.getRepositoryConnectionDataDescriptor().getHost());
        repositoryDto.setPort(repositoryDto.getRepositoryConnectionDataDescriptor().getPort());

        return repositoryDto;
    }
}
