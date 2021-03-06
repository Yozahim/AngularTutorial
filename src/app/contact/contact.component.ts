import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Feedback, ContactType } from '../shared/feedback'
import { flyInOut } from '../animations/app.animation'
import { MatDialog } from '@angular/material/dialog'
import { ContactSubmittedFormComponent } from '../contact-submitted-form/contact-submitted-form.component'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [ flyInOut() ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  }
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('form') feedbackFormDirective

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more then 25 characters'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be at least 2 characters long',
      'maxlength': 'Last name cannot be more then 25 characters'
    },
    'telnum': {
      'required': 'Telephone number is required',
      'pattern': 'Tel. number must contain only numbers'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    }
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
    ) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ['', Validators.required]
    })

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged() //reset form valudation message
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value
    this.openSubmittedForm(this.feedback)
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    })
    this.feedbackFormDirective.resetForm()
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

  openSubmittedForm(dataToPass) {
    console.log('data to pas',dataToPass)
    this.dialog.open(ContactSubmittedFormComponent, {height: '450px', width: '450px', data: dataToPass})
  }

}
