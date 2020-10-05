import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSubmittedFormComponent } from './contact-submitted-form.component';

describe('ContactSubmittedFormComponent', () => {
  let component: ContactSubmittedFormComponent;
  let fixture: ComponentFixture<ContactSubmittedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSubmittedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSubmittedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
