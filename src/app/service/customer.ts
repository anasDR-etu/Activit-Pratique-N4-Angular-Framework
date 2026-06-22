import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  backendHost: string = 'http://localhost:8085';
  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array<CustomerModel>> {
    return this.http.get<Array<CustomerModel>>(this.backendHost+'/customers');
  }

  public searchCustomers(keyword: string): Observable<Array<CustomerModel>> {
    return this.http.get<Array<CustomerModel>>(
      this.backendHost+'/customers/search?keyword=' + keyword,
    );
  }

  public saveCustomer(customer:CustomerModel):Observable<CustomerModel>{
    return this.http.post<CustomerModel>(this.backendHost+"/customers",customer);
  }

  public deleteCustomer(id : number){
    return this.http.delete<CustomerModel>(this.backendHost+"/customers/"+id);
  }
}
