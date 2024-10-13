package com.hackathon.HackerEarthGenAI;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserLoginService implements UserDetailsService {

    @Autowired
    UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> optionalUser = repo.findByUsername(username);

        if (optionalUser.isPresent()) {
            var  obj = optionalUser.get();

            return User.builder().username(obj.getUsername()).password(obj.getPassword()).build();
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }
}
