import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Customer } from '../service/customer';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CustomerModel } from '../model/customer.model';
import { throws } from 'node:assert';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [NgForOf, NgIf, AsyncPipe, ReactiveFormsModule],
  standalone: true,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers!: Observable<Array<CustomerModel>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(
    private customerService: Customer,
    private fb: FormBuilder,
  ) {}

  private loadCustomers() {
    this.customers = this.customerService.getCustomers().pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(() => err);
      }),
    );
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });

    this.loadCustomers();
  }

  protected handleSearchCustomers() {
    let key = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(key).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(() => err);
      }),
    );
  }

  protected handleDeleteCustomer(c: CustomerModel) {
    this.customerService.deleteCustomer(c.id).subscribe({
        next: () => {
          alert('Customer has been successfully deleted!');
          this.loadCustomers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}


