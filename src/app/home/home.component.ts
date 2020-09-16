import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service'
import { Promotion } from '../shared/promotion'
import { PromotionService } from '../services/promotion.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promotion: Promotion;
  dish: Dish;

  constructor(private dishService: DishService, private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => {this.promotion = promotion})
      // .catch(err => console.error(err))

    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish)
      // .catch(err => console.error(err))
  }

}
