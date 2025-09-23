package com.inventory.productservice.controller;

import com.inventory.productservice.model.Product;
import com.inventory.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import org.springframework.http.ResponseEntity; 

@RestController
@RequestMapping("/api/products") 
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping // <-- Does the create method have @PostMapping?
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // ... inside the ProductController class ...

@PutMapping("/{id}")
public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
    // First, find the existing product by its ID
    Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

    // Now, update the fields of the existing product with the new details
    existingProduct.setSku(productDetails.getSku());
    existingProduct.setName(productDetails.getName());
    existingProduct.setDescription(productDetails.getDescription());
    existingProduct.setPrice(productDetails.getPrice());
    existingProduct.setQuantity(productDetails.getQuantity());
    existingProduct.setCategory(productDetails.getCategory());
    existingProduct.setSupplier(productDetails.getSupplier());

    // Save the updated product back to the database
    final Product updatedProduct = productRepository.save(existingProduct);
    return ResponseEntity.ok(updatedProduct);
}

    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}
}