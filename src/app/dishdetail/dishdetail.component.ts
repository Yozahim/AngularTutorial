import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment'
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { visibility, flyInOut, expand } from '../animations/app.animation'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [ visibility(), flyInOut(), expand() ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  }
})
export class DishdetailComponent implements OnInit {

  errMess: string;
  dish: Dish;
  dishIds: string[]
  prev: string
  next: string
  commentForm: FormGroup
  comment: Comment
  value: 0;
  dishCopy: Dish;
  visibility = 'shown'

  @ViewChild('form') commentFormDirective

  formErrors = {
    'name': '',
    'comment': '',
    'rating': ''
  }

  validationMessages = {
    'name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long',
    },
    'comment': {
      'required': 'Comment is required',
      'minlength': 'Comment must be at least 5 characters long',
    },
    'rating': {
      'required': 'You have to rate dish!'
    }
  }

  constructor(
    private DishService: DishService, 
    private location: Location, 
    private router: ActivatedRoute,
    private com: FormBuilder,
    @Inject('BaseUrl') private BaseURL
    ) { this.createForm() }

  ngOnInit(): void {
    // let id = this.router.snapshot.params['id']
    this.DishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds)
    this.router.params.pipe(switchMap((params: Params) => 
      {
        this.visibility = 'hidden'
        return this.DishService.getDish(params['id'])
      }))
      .subscribe((dish) => { 
        this.dish = dish
        this.dishCopy = dish
        this.setPrevNext(dish.id)
        this.visibility = 'shown'
      }, errmess => this.errMess = <any>errmess)
      // .catch(err => console.error(err))
  }

  createForm() {
    this.commentForm = this.com.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
      rating: [0, Validators.required]
    })

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged()
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value
    this.comment.rating = this.value
    this.comment.date = new Date().toString()
    this.dish.comments.push(this.comment)
    this.dishCopy.comments.push(this.comment)
    this.DishService.putDish(this.dishCopy)
      .subscribe(dish => {
        this.dish = dish
        this.dishCopy = dish
      },
      ermess => { this.dish = null
      this.dishCopy = null
      this.errMess = <any>ermess})
    this.commentForm.reset({
      name: '',
      comment: '',
      rating: 0
    })
    
    this.commentFormDirective.resetForm()
  }

  goBack(): void {
    this.location.back()
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId)
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]
  }
}
