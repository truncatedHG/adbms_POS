package com.adbms.pos.entity;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GenerationType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "order_name", nullable = false)
    private String orderName;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Column(name = "order_quantity", nullable = false)
    private Integer orderQuantity;

    @Column(name = "order_total", nullable = false)
    private Integer orderTotal;


    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}