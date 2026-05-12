package com.adbms.pos.repository;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.adbms.pos.entity.Product;

import java.util.*;

public interface ProductRepository extends JpaRepository<Product, Integer>  {

    Optional<Product> findByProductName(String productName);
}


/* @Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductName(String productName);

    Optional<Product> findByProductNameAndPrice(String productName, Integer price);

    List<Product> findByProductNameIn(List<String> productNames);

    boolean existsByProductName(String productName);

    @Query("SELECT SUM(p.price) FROM product p WHERE p.productName IN :names")
    Integer sumPriceByProductNames(@Param("names") List<String> names);

    @Query("""
    SELECT SUM(i.stock)
    FROM inventory i
    WHERE i IN (
        SELECT p.inventory
        FROM product p
        WHERE p.productName IN :names
    )
""")
Integer sumStockByProductNames(@Param("names") List<String> names);

    @Modifying
    @Transactional
    @Query("""
        UPDATE inventory i
        SET i.stock = i.stock - :qty
        WHERE i = (
            SELECT p.inventory
            FROM product p
            WHERE p.productName = :name
        )
        AND i.stock >= :qty
    """)

    int deductStockByProductName(@Param("name") String name,
     @Param("qty") int qty);

        @Query("""
        SELECT i.stock
        FROM inventory i
        WHERE i = (
            SELECT p.inventory
            FROM product p
            WHERE p.productName = :name
        )
    """)
    Integer getStockByProductName(@Param("name") String name);
}
    */