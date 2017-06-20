package com.repo.rest;

import com.google.gson.Gson;
import com.repo.dao.data.UserDaoHelper;
import com.repo.dao.pojo.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.NonUniqueResultException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

/**
 * Created by ali_jalbani on 4/14/17.
 */

@RestController
@RequestMapping("/users")
public class UsersService extends GeneralService {

    @RequestMapping(value = "/getAll",
            method = RequestMethod.GET,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getAll() throws RuntimeException {
        JSONObject data = new JSONObject();
        String json = "";
        try {
            JSONParser parser = new JSONParser();
            Resource resource = new ClassPathResource("mock/db.json");
            //Use JSONObject for simple JSON and JSONArray for array of JSON.
            data = (JSONObject) parser.parse(
                    new FileReader(resource.getFile()));//path to the JSON file.

        } catch (IOException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        } finally {
            return data;
        }
    }

    @RequestMapping(value = "/getAllUsers",
            method = RequestMethod.GET,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getAllUsers() throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            List<User> users = UserDaoHelper.getAllUsers();
            String json = new Gson().toJson(users);
            JSONParser parser = new JSONParser();
            data.put("payload", parser.parse(json));
            data.put("success", true);
        }catch( Exception e ){
            data.put("success", false);
            data.put("payload", e.toString());
            e.printStackTrace();
        }finally{
            return data;
        }
    }

    @RequestMapping(value = "/savefield",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject updateUser(@RequestParam(value = "id") Integer id,
                            @RequestParam(value = "field") String field,
                            @RequestParam(value = "value") String value) throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            User user = UserDaoHelper.updateUser(id, field, value);
            String json = new Gson().toJson(user);
            JSONParser parser = new JSONParser();
            data.put("payload", parser.parse(json));
            data.put("success", true);
        }catch( Exception e ){
            data.put("success", false);
            data.put("payload", e.toString());
            e.printStackTrace();
        }finally{
            return data;
        }
    }

    @RequestMapping(value = "/newUser",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject createNewUser(@RequestParam(value = "role") Integer role,
                            @RequestParam(value = "email") String email,
                            @RequestParam(value = "name") String name) throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            User user = UserDaoHelper.createNewUser(name, email, role);
            String json = new Gson().toJson(user);
            JSONParser parser = new JSONParser();
            data.put("payload", parser.parse(json));
            data.put("success", true);
        }catch(NonUniqueResultException e){
            data.put("payload", "User already exists for this email.");
            data.put("success", false);
        }catch( Exception e ){
            data.put("success", false);
            data.put("payload", e.toString());
            e.printStackTrace();
        }finally{
            return data;
        }
    }

    @RequestMapping(value = "/deleteUser",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject createNewUser(@RequestParam(value = "ids") int ids[]) throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            boolean success = UserDaoHelper.deleteUsers(ids);
            data.put("payload", "NA");
            data.put("success", success);
        }catch( Exception e ){
            data.put("success", false);
            data.put("payload", e.toString());
            e.printStackTrace();
        }finally{
            return data;
        }
    }
}
