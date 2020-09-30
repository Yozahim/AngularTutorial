import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'
import { baseUrl } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators'
import { ProcessHTTPMsgService } from './process-httpmsg.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  // getPromotions(): Promise<Promotion[]> {
  //   return Promise.resolve(PROMOTIONS)
  // }
  getPromotions(): Observable<Promotion[]> {
    // // Simulate 2 sec delay
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS), 2000;
    //   });
    // });
    //OBSERVABLES
    return this.http.get<Promotion[]>(baseUrl + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError))
  }

  // getPromotion(id: string): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0])
  // }
  getPromotion(id: string): Observable<Promotion> {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0]), 2000;
    //   });
    // });
    //OBSERVABLES
    return this.http.get<Promotion>(baseUrl + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  // getFeaturedPromotion(): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter(promotion => promotion.featured)[0])
  // }
  getFeaturedPromotion(): Observable<Promotion> {
    // return new Promise((resolve) => {
    //   setTimeout(
    //     () => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),
    //     2000
    //   );
    // });
    //OBSERVABLES
    return this.http.get<Promotion>(baseUrl + 'promotions?featured=true').pipe(map(promotions => promotions[0])).pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
