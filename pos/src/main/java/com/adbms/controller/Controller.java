package com.adbms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.adbms.service.ProductService;
import com.adbms.entity.Order;

@CrossOrigin(origins = "*") // Allow requests from any origin
@RestController
@RequestMapping("/pos")
public class Controller {

    @Autowired
    private ProductService DatabaseService;



}