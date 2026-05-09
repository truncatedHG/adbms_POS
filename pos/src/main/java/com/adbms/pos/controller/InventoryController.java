package com.adbms.pos.controller;

import com.adbms.pos.model.Inventory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
public class InventoryController {

    private final List<Inventory> inventoryList = new ArrayList<>();

    public InventoryController() {
        inventoryList.add(new Inventory("101", "Coffee Beans", 12, "05/08/2026"));
    }

    @GetMapping("/inventory")
    public String showInventory(Model model,
                                @RequestParam(required = false) String message) {
        model.addAttribute("inventory", inventoryList);
        model.addAttribute("message", message == null ? "" : message);
        return "inventory";
    }

    @PostMapping("/inventory")
    public String processInventoryAction(
            @RequestParam String action,
            @RequestParam String productId,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false, defaultValue = "0") int quantity,
            @RequestParam(required = false) String date,
            Model model) {

        String message;
        switch (action) {
            case "add" -> {
                if (productId.isBlank() || productName == null || productName.isBlank() || date == null || date.isBlank()) {
                    message = "Product ID, name, and date are required to add an item.";
                    return "redirect:/inventory?message=" + message;
                }
                inventoryList.add(new Inventory(productId, productName, quantity, date));
                message = "Added item " + productId + ".";
            }
            case "delete" -> {
                Iterator<Inventory> iterator = inventoryList.iterator();
                boolean removed = false;
                while (iterator.hasNext()) {
                    if (iterator.next().getProductId().equals(productId)) {
                        iterator.remove();
                        removed = true;
                        break;
                    }
                }
                message = removed ? "Deleted item " + productId + "." : "Item " + productId + " not found.";
            }
            case "update" -> {
                Inventory found = null;
                for (Inventory item : inventoryList) {
                    if (item.getProductId().equals(productId)) {
                        found = item;
                        break;
                    }
                }
                if (found == null) {
                    message = "Item " + productId + " not found.";
                } else if (productName == null || productName.isBlank() || date == null || date.isBlank()) {
                    message = "Product name and date are required to update an item.";
                } else {
                    found.setProductName(productName);
                    found.setQuantity(quantity);
                    found.setDate(date);
                    message = "Updated item " + productId + ".";
                }
            }
            default -> message = "Unknown action: " + action;
        }

        model.addAttribute("inventory", inventoryList);
        return "redirect:/inventory?message=" + message;
    }
}
