package com.example.crud;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    
    private String type;
    
    private String status;
    
    private String displaynameTh;
    
    private String displaynameEn;
    
    private String email;
    
    private String department;
    
    private String faculty;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDisplaynameTh() {
        return displaynameTh;
    }

    public void setDisplaynameTh(String displaynameTh) {
        this.displaynameTh = displaynameTh;
    }

    public String getDisplaynameEn() {
        return displaynameEn;
    }

    public void setDisplaynameEn(String displaynameEn) {
        this.displaynameEn = displaynameEn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
}
