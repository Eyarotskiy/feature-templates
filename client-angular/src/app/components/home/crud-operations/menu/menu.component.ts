import { Component, Input } from '@angular/core';
import { DishData } from 'src/app/shared/types';
import { formatDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() menu?: DishData[];

  formatDate = formatDate;

  constructor() { }
}
