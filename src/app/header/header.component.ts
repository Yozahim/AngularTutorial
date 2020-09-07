import { Component, OnInit } from '@angular/core';
import { faHome, faInfo, faList, faPhone, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faHome = faHome;
  faInfo = faInfo;
  faList = faList;
  faPhone = faPhone;
  faSignInAlt = faSignInAlt;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {height: '450px', width: '500px'})
  }

}
