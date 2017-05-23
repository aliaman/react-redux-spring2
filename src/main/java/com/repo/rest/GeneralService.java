package com.repo.rest;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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

//    protected static Gson getGsonBuilder(Class<?> clazzz){
//        Gson gson = new GsonBuilder()
//                .setExclusionStrategies(new ExclusionStrategy() {
//
//                    public boolean shouldSkipClass(Class<?> clazz) {
//                        return (clazz == clazzz.class);
//                    }
//
//                    /**
//                     * Custom field exclusion goes here
//                     */
//                    public boolean shouldSkipField(FieldAttributes f) {
//                        return false;
//                    }
//
//                })
//                /**
//                 * Use serializeNulls method if you want To serialize null values
//                 * By default, Gson does not serialize null values
//                 */
//                .serializeNulls()
//                .create();
//
//            return gson;
//    }
}
