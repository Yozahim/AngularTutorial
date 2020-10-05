import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-submitted-form',
  templateUrl: './contact-submitted-form.component.html',
  styleUrls: ['./contact-submitted-form.component.scss']
})
export class ContactSubmittedFormComponent implements OnInit {

  submitForm: FormGroup;

  form = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: '',
    message: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContactSubmittedFormComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
    console.log('forma hehe',this.form)
    this.form = this.data
  }

  onSubmit() {
    this.dialogRef.close()
    this.form = { 
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: '',
      message: ''
    }
  }

}
