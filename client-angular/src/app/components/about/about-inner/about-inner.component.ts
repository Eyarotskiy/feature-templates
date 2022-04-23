import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-about-inner',
  templateUrl: './about-inner.component.html',
  styleUrls: ['./about-inner.component.scss']
})
export class AboutInnerComponent implements OnInit {
  id?: string;
  name?: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.name = params['name'];
    })
  }
}
