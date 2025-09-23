package com.inventory.productservice.model;

import jakarta.persistence.Column; // <-- Add this new import
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- NEW AND UPDATED FIELDS ---

    @Column(unique = true, nullable = false) // Make SKU unique and required
    private String sku;

    private String name;

    @Column(length = 1024) // Allow for a longer description
    private String description;

    private double price;
    private int quantity;
    private String category;
    private String supplier;
}