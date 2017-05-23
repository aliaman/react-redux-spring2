package com.repo.dao.pojo;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by ali_jalbani on 5/19/17.
 */

@Entity
@Table(name="t_comments")
public class Comment {


    @Id
    @Expose
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

    @Expose
    private String comment;

    @Expose
    private String mitigation;

    @Expose
    private String reason;

    public List<Audit> getAuditList() {
        return auditList;
    }

    public void setAuditList(List<Audit> auditList) {
        this.auditList = auditList;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "comment", cascade = CascadeType.ALL)
    @Expose private List<Audit> auditList = new ArrayList<Audit>();

}
