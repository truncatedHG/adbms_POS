package com.adbms.pos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.RequiredArgsConstructor;

import com.adbms.pos.dto.CheckoutResponse;
import com.adbms.pos.entity.Orders;
import com.adbms.pos.entity.Product;
import com.adbms.pos.repository.InventoryRepository;
import com.adbms.pos.repository.OrderRepository;
import com.adbms.pos.repository.ProductRepository;
import com.adbms.pos.service.OrderService;
import com.adbms.pos.service.ProductService;

import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@CrossOrigin("*") // Allow requests from any origin
@RestController
@RequestMapping("/pos")
public class OrderController {

  private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(@RequestBody List<Map<String, Object>> orderItems) {
        try {
            orderService.processCheckout(orderItems);
            // Matches your JS 'result.success' and 'result.message'
            return ResponseEntity.ok(new CheckoutResponse(true, "Order processed successfully!"));
        } catch (Exception e) {
            return ResponseEntity.ok(new CheckoutResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/recent")
public ResponseEntity<List<Orders>> getRecentOrders() {
    // Assuming your orderService has a method to find recent orders
    List<Orders> recentOrders = orderService.getAllOrders(); 
    return ResponseEntity.ok(recentOrders);
}

}