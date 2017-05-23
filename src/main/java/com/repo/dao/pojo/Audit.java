package com.repo.dao.pojo;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by ali_jalbani on 5/23/17.
 */

@Entity
@Table(name="t_audit")
public class Audit {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getColumn_edited() {
        return column_edited;
    }

    public void setColumn_edited(String column_edited) {
        this.column_edited = column_edited;
    }

    public String getColumn_newvalue() {
        return column_newvalue;
    }

    public void setColumn_newvalue(String column_newvalue) {
        this.column_newvalue = column_newvalue;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @Expose
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Expose
    private String column_edited;

    @Expose
    private String column_newvalue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="comment_id")
    private Comment comment;

    @ManyToOne
    @JoinColumn(name="user_id")
    @Expose private User user;
}
