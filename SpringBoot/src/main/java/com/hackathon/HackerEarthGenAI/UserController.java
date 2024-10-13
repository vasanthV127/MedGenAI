package com.hackathon.HackerEarthGenAI;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/**,http://192.168.137.217:3000/**,http://172.18.158.214/**")
public class UserController {

    @Autowired
    UserService service;



    @PostMapping("/register")
    private ResponseEntity<String> setChatDetails(@RequestBody UserModel user){

        try{
            service.setUserDetails(user);
            return ResponseEntity.ok("Successfully Registered ");
        }
        catch (Exception e){

            return ResponseEntity.status(504).body("Username Already Exists");
        }
    }


    @GetMapping("/Users")
    private  ResponseEntity<List<UserModel>> getChatDetails(){
        try{
            List <UserModel> data = service.getUserDetails();
            return ResponseEntity.ok(data);
        }
        catch (Exception e){

            return ResponseEntity.status(504).body(null);
        }
    }






}
