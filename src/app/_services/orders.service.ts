﻿import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import {Order} from '../_models/order';
import {AppSettings} from '../app.settings';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }

  getById(id: number) {
    return this.http.get(AppSettings.API_ENDPOINT + '/orders/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(order: Order) {
    return this.http.post(AppSettings.API_ENDPOINT + '/orders', order, this.jwt()).map((response: Response) => response.json());
  }

  addMeal(order_id,meal) {
    return this.http.post(AppSettings.API_ENDPOINT + '/orders/' + order_id + '/meals', meal, this.jwt()).map((response: Response) => response.json());
  }

  removeMeal(order_id,meal_id) {
    return this.http.delete(AppSettings.API_ENDPOINT + '/orders/' + order_id + '/meals/' + meal_id, this.jwt()).map((response: Response) => response.json());
  }

  removeUser(order_id,user_id) {
    return this.http.delete(AppSettings.API_ENDPOINT + '/orders/' + order_id + '/users/' + user_id, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
