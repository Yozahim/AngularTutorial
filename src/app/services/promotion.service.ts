import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor() {}

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
    return of(PROMOTIONS).pipe(delay(2000))
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
    return of(PROMOTIONS.filter((promotion) => promotion.id === id)[0]).pipe(delay(2000))
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
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000))
  }
}
