package com.monmoney.monopoly.model;

import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
public class Player implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "balance")
    private int balance;

    Player(){
        this.balance = 15000000;
    }

    public Player(String username){
        this.username = username;
        this.balance = 15000000;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public int getBalance() {
        return balance;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
    public void addBalance(Double amount){
        this.balance += amount;
    }
    public void subtractBalance(Double amount){
        this.balance -= amount;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", balance=" + balance +
                '}';
    }
}
