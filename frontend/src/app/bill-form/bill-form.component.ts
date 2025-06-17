import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-form',
  standalone: false,
  templateUrl: './bill-form.component.html',
  styleUrl: './bill-form.component.css',
})
export class BillFormComponent {
  form: FormGroup;
  items = [
    'Mango',
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Kiwi',
    'Strawberry',
  ];
  locationNames: string[] = []; // populate from location service
  addedItems: any[] = [];

  totalQuantity = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: ['', Validators.required],
      batch: ['', Validators.required],
      standardCost: [0, Validators.required],
      standardPrice: [0, Validators.required],
      quantity: [0, Validators.required],
      discount: [0, Validators.required],
    });

    // simulate fetching from Location_Details
    this.locationNames = JSON.parse(
      localStorage.getItem('Location_Details') || '[]'
    ).map((loc: any) => loc.Location_Name);
  }

  get totalCost(): number {
    const { standardCost, quantity, discount } = this.form.value;
    return standardCost * quantity - (standardCost * quantity * discount) / 100;
  }

  get totalSelling(): number {
    const { standardPrice, quantity } = this.form.value;
    return standardPrice * quantity;
  }

  onAdd() {
    if (this.form.invalid) return;
    const item = {
      ...this.form.value,
      totalCost: this.totalCost,
      totalSelling: this.totalSelling,
    };
    this.addedItems.push(item);
    this.totalQuantity += item.quantity;
    this.form.reset();
  }
}
