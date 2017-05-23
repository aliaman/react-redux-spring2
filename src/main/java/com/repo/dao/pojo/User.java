package com.repo.dao.pojo;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by ali_jalbani on 4/25/17.
 */

@Entity
@Table(name="t_users")
public class User {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Timestamp lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    private int id;

    @Expose
    private String email;

    @Expose
    private String name;
    private String password;
    private Timestamp lastUpdated;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

//    public List<Audit> getAuditList() {
//        return auditList;
//    }
//    public void setAuditList(List<Audit> auditList) {
//        this.auditList = auditList;
//    }
//    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Audit> auditList;

}
