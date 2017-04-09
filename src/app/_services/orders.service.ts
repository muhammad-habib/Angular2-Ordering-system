﻿import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from "rxjs";

import {Order} from '../_models/order';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }

  create(order: Order) {
    return this.http.post('http://localhost:8090/orders', order, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
