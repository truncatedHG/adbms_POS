package com.adbms.pos.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Integer stockId;

    private String stockName;
    private Integer stock;

    // New field for soft delete
    @Column(name = "is_active")
    private boolean active = true; 
}