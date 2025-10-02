
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class AddProduct implements OnChanges {
  @Input() productToEdit?: Product; // Input from the parent component
  @Output() productSaved = new EventEmitter<Product>(); // Renamed for clarity
  @Output() closeModal = new EventEmitter<void>();

  product: Omit<Product, 'id'> | Product = this.resetProduct();
  isEditMode = false;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // This runs when the 'productToEdit' input changes
    if (changes['productToEdit'] && this.productToEdit) {
      this.isEditMode = true;
      this.product = { ...this.productToEdit }; // Pre-fill the form
    } else {
      this.isEditMode = false;
      this.product = this.resetProduct();
    }
  }

  onSubmit(): void {
    if (this.isEditMode && 'id' in this.product) {
      // Update existing product
      this.productService.updateProduct(this.product.id, this.product).subscribe(updatedProduct => {
        this.productSaved.emit(updatedProduct);
      });
    } else {
      // Create new product
      this.productService.createProduct(this.product as Omit<Product, 'id'>).subscribe(newProduct => {
        this.productSaved.emit(newProduct);
      });
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  private resetProduct(): Omit<Product, 'id'> {
    return {
      sku: '', name: '', description: '', price: 0,
      quantity: 0, category: '', supplier: ''
    };
  }
}