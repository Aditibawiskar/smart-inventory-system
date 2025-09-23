
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Add FormsModule here
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  @Output() productAdded = new EventEmitter<Product>();
   @Output() closeModal = new EventEmitter<void>();

 product: Omit<Product, 'id'> = {
  sku: '',
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
  supplier: ''
};

  constructor(private productService: ProductService) {}

  onClose(): void {
    this.closeModal.emit();
  }


  onSubmit(): void {
  console.log('1. Form submitted. Product data:', this.product); // <-- LOG 1

  this.productService.createProduct(this.product).subscribe(newProduct => {
    console.log('2. Backend responded with new product:', newProduct); // <-- LOG 2
    this.productAdded.emit(newProduct);
  });
}
}