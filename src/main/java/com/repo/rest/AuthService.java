package com.repo.rest;

import com.repo.dao.data.HibernateUtil;
import com.repo.dao.data.UserDaoHelper;
import com.repo.dao.pojo.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import java.beans.Expression;

/**
 * Created by ali_jalbani on 4/26/17.
 */
@RestController
@RequestMapping("/auth")
public class AuthService extends GeneralService {

    @RequestMapping(value = "/login",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getAll(@RequestParam(value = "email") String email) throws RuntimeException {
        JSONObject json = getSkeletonJson();
        try{
            json.put("payload", UserDaoHelper.findUserByEmail(email));
            json.put("success", true);
        }catch(Exception e){
            json.put("success", false);
            json.put("payload", e.toString());
            e.printStackTrace();
        }finally {
            return json;
        }
    }
}
