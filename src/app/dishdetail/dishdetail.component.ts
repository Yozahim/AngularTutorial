import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment'
import { DishService } from '../services/dish.service'
import { switchMap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[]
  prev: string
  next: string
  commentForm: FormGroup
  comment: Comment
  value: 0
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
    private com: FormBuilder
    ) { this.createForm() }

  ngOnInit(): void {
    // let id = this.router.snapshot.params['id']
    this.DishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds)
    this.router.params.pipe(switchMap((params: Params) => 
      this.DishService.getDish(params['id'])))
      .subscribe((dish) => { 
        this.dish = dish
        this.setPrevNext(dish.id)
      })
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
