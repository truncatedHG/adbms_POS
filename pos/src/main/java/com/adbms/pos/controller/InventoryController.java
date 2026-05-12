package com.adbms.pos.controller;

import com.adbms.pos.entity.Inventory;
import com.adbms.pos.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryRepository inventoryRepo;

    @GetMapping("/all")
    public List<Inventory> getAll() {
        // Only return items where active is true
        return inventoryRepo.findAllByActiveTrue();
    }

    @PostMapping("/save")
    public ResponseEntity<Inventory> save(@RequestBody Inventory item) {
        return ResponseEntity.ok(inventoryRepo.save(item));
    }

    @PostMapping("/add-stock")
    public ResponseEntity<Inventory> addStock(@RequestBody Inventory item) {
        
        // 1. Search for the item (using the safe 'findFirst' method)
        return inventoryRepo.findFirstByStockName(item.getStockName()).map(existing -> {
            
            // 2. Bring it back to life
            existing.setActive(true); 
            
            // 3. NULL-SAFE MATH: Treat nulls as 0 to prevent crashes
            int currentStock = existing.getStock() != null ? existing.getStock() : 0;
            int addedStock = item.getStock() != null ? item.getStock() : 0;
            
            existing.setStock(currentStock + addedStock);
            
            return ResponseEntity.ok(inventoryRepo.save(existing));
            
        }).orElseGet(() -> {
            // 4. If brand new, make sure it's active and stock isn't null
            item.setActive(true);
            if (item.getStock() == null) item.setStock(0);
            
            return ResponseEntity.ok(inventoryRepo.save(item));
        });
    }

    @DeleteMapping("/delete/{stockId}")
    public ResponseEntity<Void> delete(@PathVariable("stockId") Integer stockId) {
        return inventoryRepo.findById(stockId).map(item -> {
            item.setActive(false); // Flip the switch
            inventoryRepo.save(item); // Save the "deactivated" state
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
    
}