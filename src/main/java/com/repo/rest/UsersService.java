package com.repo.rest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileReader;
import java.io.IOException;

/**
 * Created by ali_jalbani on 4/14/17.
 */

@RestController
@RequestMapping("/users")
public class UsersService {

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

            json = data.toJSONString();
        } catch (IOException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        } finally {
            return data;
        }
    }
}
