package com.repo.archiver.processes;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.index.query.QueryBuilders;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ali_jalbani on 7/24/17.
 */
public class EfficacyMetrics extends AbstractProcess {

    public void run(){
        try {
            System.out.println("Running Efficacy Metrics");

            RestClient restClient = RestClient.builder(
                    new HttpHost("search-cynic-analytics-v2-nato57mz432a4jklgi6bp7fgwm.us-east-1.es.amazonaws.com", 80, "http"),
                    new HttpHost("search-cynic-analytics-v2-nato57mz432a4jklgi6bp7fgwm.us-east-1.es.amazonaws.com/", 80, "http")).build();

            Map<String, String> params = new HashMap<>();
            params.put("size", "100");
            params.put("q", "NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe AND conviction:clean AND retrospective.reputation:<-100 AND timestamp:>=1492585200000 AND timestamp:<=1493189999999" );

            Response response = restClient.performRequest("GET", "/_search", params);
            System.out.println(response.getEntity());
            restClient.close();

        }catch (IOException ioException){
            System.out.println(ioException.toString());
        }catch (Exception e){
            System.out.println(e.toString());
        }

    }
}
