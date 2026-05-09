package com.adbms.pos.model;

public class Inventory {
    private String productId;
    private String productName;
    private int quantity;
    private String date;

    public Inventory() {
    }

    public Inventory(String productId, String productName, int quantity, String date) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.date = date;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
