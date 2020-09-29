import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service'
import { Promotion } from '../shared/promotion'
import { PromotionService } from '../services/promotion.service'
import { flyInOut, expand } from '../animations/app.animation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ flyInOut(), expand() ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  }
})
export class HomeComponent implements OnInit {

  promotion: Promotion;
  dish: Dish;
  dishErrMess: string;
  promErrMess: string;

  constructor(
    private dishService: DishService, 
    private promotionService: PromotionService,
    @Inject("BaseUrl") private BaseURL) { }

  ngOnInit(): void {
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => {this.promotion = promotion},
      errmess => this.promErrMess = <any>errmess)
      // .catch(err => console.error(err))

    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess)
      // .catch(err => console.error(err))
  }

}
