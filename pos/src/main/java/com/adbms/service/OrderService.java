package com.adbms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.adbms.entity.*;
import com.adbms.repository.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository OrderRepository;

    public Order createOrder(Order order) {
        return OrderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return OrderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return OrderRepository.findById(id);
    }

    public Order updateOrder(Integer id, Order updated) {
        updated.setOrderId(id);
        return OrderRepository.save(updated);
    }

    public void deleteOrder(Integer id) {
        OrderRepository.deleteById(id);
    }

    public List<Order> getOrdersByProduct(Integer productId) {
        return OrderRepository.findByProduct_ProductId(productId);
    }
}