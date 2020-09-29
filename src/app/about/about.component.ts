import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../animations/app.animation'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ flyInOut() ],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  }
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
