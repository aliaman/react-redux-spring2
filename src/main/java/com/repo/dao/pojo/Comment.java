package com.repo.dao.pojo;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by ali_jalbani on 5/19/17.
 */

@Entity
@Table(name="t_comments")
public class Comment {


    @Id
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getMitigation() {
        return mitigation;
    }

    public void setMitigation(String mitigation) {
        this.mitigation = mitigation;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    private String comment;
    private String mitigation;
    private String reason;

}
