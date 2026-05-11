package com.adbms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adbms.entity.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Integer because product_id is INT not BIGINT
}