package com.adbms.pos.service;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.adbms.pos.entity.*;
import com.adbms.pos.repository.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderService {

   private final ProductRepository productRepo;
    private final InventoryRepository inventoryRepo;
    private final OrderRepository orderRepo;

    @Transactional
    public void processCheckout(List<Map<String, Object>> payload) {
        for (Map<String, Object> item : payload) {
            String name = (String) item.get("name");
            Integer orderQty = Integer.valueOf(item.get("qty").toString());

            // 1. Find Product
            Product product = productRepo.findByProductName(name)
                .orElseThrow(() -> new RuntimeException("Product not found: " + name));

            // 2. Loop through EVERY ingredient in the recipe
            for (Recipe recipe : product.getRecipes()) {
                Inventory stockItem = recipe.getInventory();
                Integer totalNeeded = recipe.getQuantityRequired() * orderQty;

                // Check stock
                if (stockItem.getStock() < totalNeeded) {
                    throw new RuntimeException("Not enough " + stockItem.getStockName());
                }

                // Subtract from Inventory
                stockItem.setStock(stockItem.getStock() - totalNeeded);
                inventoryRepo.save(stockItem);
            }

            // 3. Save the Order record
            Orders order = Orders.builder()
                    .orderName("POS_" + System.currentTimeMillis())
                    .orderDate(LocalDate.now())
                    .orderQuantity(orderQty)
                    .orderTotal((Integer) item.get("price") * orderQty)
                    .product(product)
                    .build();
            
            orderRepo.save(order);
            
        }
        
    }

    public List<Orders> getAllOrders() {
    return orderRepo.findAll();
    }
}