package br.org.domain.user.builder;

import br.org.domain.user.User;
import br.org.domain.user.dto.CurrentUserDto;
import br.org.tutty.Equalizer;

public class CurrentUserBuilder {

    public static CurrentUserDto build(User user, String token){
        CurrentUserDto currentUser = new CurrentUserDto();
        Equalizer.equalize(user, currentUser);
        currentUser.setToken(token);

        return currentUser;
    }

}
