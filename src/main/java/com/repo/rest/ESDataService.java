package com.repo.rest;

import com.google.gson.Gson;
import com.repo.dao.data.CommentDaoHelper;
import com.repo.dao.pojo.Comment;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by ali_jalbani on 5/19/17.
 */

@RestController
@RequestMapping("/esdata")
public class ESDataService extends GeneralService {

    @RequestMapping(value = "/comments",
            method = RequestMethod.GET,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getComments() throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            List<Comment> comments = CommentDaoHelper.getAllComments();
            String json = new Gson().toJson(comments);
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

    @RequestMapping(value = "/comment",
            method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_VALUE)
    public JSONObject postComment(@RequestParam(value = "id", required = true) String id,
                                  @RequestParam(value = "comment", required = false) String comment,
                                  @RequestParam(value = "reason", required = false) String reason,
                                  @RequestParam(value = "mitigation", required = false) String mitigation) throws RuntimeException {
        JSONObject data = getSkeletonJson();
        try {
            CommentDaoHelper.saveComments(id, comment, reason, mitigation);
            data.put("payload", "Comment Saved");
            data.put("success", true);
        }catch( Exception e ){
            data.put("success", false);
            data.put("payload", e.toString());
            e.printStackTrace();
        }finally{
            return data;
        }
    }

}

