import { Component, Input } from '@angular/core';
import { UserData } from 'src/app/shared/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @Input() users?: UserData[];

  constructor() { }
}
