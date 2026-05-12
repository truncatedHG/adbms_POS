package com.adbms.pos.repository;

import com.adbms.pos.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    
    List<Inventory> findAllByActiveTrue();
    
    // CHANGED: Use 'findFirst' to prevent crashes if duplicates exist in your DB
    Optional<Inventory> findFirstByStockName(String stockName);
}