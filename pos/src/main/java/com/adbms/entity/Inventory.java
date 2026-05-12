 package com.adbms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @Column(name = "stock_id")
    private Integer stock_id;

    @Column(name = "stock_name", nullable = false)
    private String stock_name;

     @Column(name = "stock", nullable = false)
    private Integer stock;

     public Integer getStock_id() {
         return stock_id;
     }

     public void setStock_id(Integer stock_id) {
         this.stock_id = stock_id;
     }

     public String getStock_name() {
         return stock_name;
     }

     public void setStock_name(String stock_name) {
         this.stock_name = stock_name;
     }

     public Integer getStock() {
         return stock;
     }

     public void setStock(Integer stock) {
         this.stock = stock;
     }

    
    
}
