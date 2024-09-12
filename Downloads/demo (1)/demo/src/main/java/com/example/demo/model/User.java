package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Lombok for getters, setters, equals, etc.
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
}
