package com.repo.rest;

import com.repo.dao.data.UserDaoHelper;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;

/**
 * Created by ali_jalbani on 4/26/17.
 */
@RestController
@RequestMapping("/auth")
public class AuthService extends GeneralService {

    @RequestMapping(value = "/login",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject login(@RequestParam(value = "email") String email) throws RuntimeException {
        JSONObject json = getSkeletonJson();
        try{
            json.put("payload", UserDaoHelper.findUserByEmail(email));
            json.put("success", true);
        }catch(NoResultException nr){
            json.put("success", false);
            json.put("payload", "Could not authorize your credentials.");
            nr.printStackTrace();
        }catch(Exception e){
            json.put("success", false);
            json.put("payload", e.toString());
            e.printStackTrace();
        }finally {
            return json;
        }
    }
}
