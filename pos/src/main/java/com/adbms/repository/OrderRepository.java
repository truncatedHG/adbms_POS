package com.adbms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

import com.adbms.entity.*;;
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    // find all orders by product
    List<Order> findByProduct_ProductId(Integer productId);
}