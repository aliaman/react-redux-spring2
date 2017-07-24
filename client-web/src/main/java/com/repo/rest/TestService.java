package com.repo.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.json.simple.JSONObject;
/**
 * Created by ali_jalbani on 4/14/17.
 */
@RestController
@RequestMapping("/test")
public class TestService {

    @RequestMapping(value = "/testdata", method = RequestMethod.GET)
    public JSONObject test() throws RuntimeException {
        JSONObject json = new JSONObject();
        json.put("test", "123");
        return json;
    }
}
