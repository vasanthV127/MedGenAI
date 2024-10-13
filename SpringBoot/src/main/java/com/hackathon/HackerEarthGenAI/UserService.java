package com.hackathon.HackerEarthGenAI;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    @Autowired
    UserRepo repo;


    @Autowired
    PasswordEncoder encoder;

    public void setUserDetails(UserModel user) {

        user.setPassword(encoder.encode(user.getPassword()));

        repo.save(user);
    }

    public List<UserModel> getUserDetails() {

        return repo.findAll();
    }

    public boolean validate(UserModel credentials) {
        Optional<UserModel> userOptional = repo.findByUsername(credentials.getUsername());
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();

            return encoder.matches(credentials.getPassword(), user.getPassword());
        }
        return false;
    }


}
