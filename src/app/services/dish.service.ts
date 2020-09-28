import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators'
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
    ) {}

  // getDishes(): Promise<Dish[]> {
  //   return Promise.resolve(DISHES)
  // }
  getDishes(): Observable<Dish[]> {
    // return new Promise((resolve) => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(DISHES), 2000);
    // });
    //OBSERVABLES
    // return of(DISHES).pipe(delay(2000))
    //HTTP REQUEST
    return this.http.get<Dish[]>(baseUrl + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError))
  }

  // getDish(id: string): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => dish.id === id)[0])
  // }
  getDish(id: string): Observable<Dish> {
    // return new Promise((resolve) => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(
    //     () => resolve(DISHES.filter((dish) => dish.id === id)[0]),
    //     2000
    //   );
    // });
    //OBSERVABLES
    // return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000))
    //HTTP REQUEST
    return this.http.get<Dish>(baseUrl + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  // getFeaturedDish(): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter(dish => dish.featured)[0])
  // }
  getFeaturedDish(): Observable<Dish> {
    // return new Promise((resolve) => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(
    //     () => resolve(DISHES.filter((dish) => dish.featured)[0]),
    //     2000
    //   );
    // });
    //OBSERVABLES
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    //HTTP REQUEST
    return this.http.get<Dish>(baseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getDishIds(): Observable<String[] | any> {
    //OBSERVABLES
    // return of(DISHES.map((dish) => dish.id));
    //HTTP REQUEST
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error))
  }

  putDish(dish: Dish): Observable<Dish> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Dish>(baseUrl + 'dishes/' + dish.id, dish, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
