
package com.inventory.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.productservice.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}