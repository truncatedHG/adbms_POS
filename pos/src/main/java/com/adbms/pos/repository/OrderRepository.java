package com.adbms.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adbms.pos.entity.*;
import com.adbms.pos.entity.Orders;

import java.util.*;;
@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
    
    List<Orders> findTop10ByOrderByOrderDateDesc();
}