import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { AddProduct } from '../add-product/add-product';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,AddProduct], // We need this for *ngFor
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = []; // This will hold our list of products
 isModalOpen = false; 
 productToEdit?: Product;
  // 1. We "inject" our ProductService here
  constructor(private productService: ProductService) { }

  // 2. This method runs automatically when the component loads
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data; // 3. We get the data and assign it
    });
  }

  addProductToList(newProduct: Product): void {
  console.log('3. Parent component received new product:', newProduct); // <-- LOG 3
  this.products.push(newProduct);
  this.closeModal();
}
  // Add these new methods

 // This method now handles both new and updated products
  handleProductSaved(savedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === savedProduct.id);
    if (index !== -1) {
      // It's an update, so replace the item in the array
      this.products[index] = savedProduct;
    } else {
      // It's a new product, so add it to the array
      this.products.push(savedProduct);
    }
    this.closeModal(); // Close the modal
  }

   openEditModal(product: Product): void {
    this.productToEdit = product; // Set the product to edit
    this.isModalOpen = true;
  }

   openAddModal(): void {
    this.productToEdit = undefined; // Ensure we're in "add" mode
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  onDelete(id: number): void {
  this.productService.deleteProduct(id).subscribe(() => {
    // Remove the product from the local array to update the UI instantly
    this.products = this.products.filter(product => product.id !== id);
  });
}
}