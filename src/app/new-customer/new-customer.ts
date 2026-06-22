import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerModel } from '../model/customer.model';
import { Customer } from '../service/customer';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer implements OnInit {
  newCustomerFormGroup!: FormGroup;

  constructor(private customerService : Customer,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null,[Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required,Validators.email]),
    });
  }

  handleSaveCustomer() {
      let customer:CustomerModel = this.newCustomerFormGroup.value;
      this.customerService.saveCustomer(customer).subscribe({
        next : value => {
          alert("Customer has been successfully saved !")
          this.newCustomerFormGroup.reset();
        },
        error : err => {
          console.log(err);
        }
      });
  }
}
