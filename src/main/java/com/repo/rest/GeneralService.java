package com.repo.rest;

import org.json.simple.JSONObject;

/**
 * Created by ali_jalbani on 4/26/17.
 */
public class GeneralService {
    protected JSONObject getSkeletonJson(){
        JSONObject json = new JSONObject();
        json.put("success", "");
        json.put("payload", "");
        return json;
    }
}
