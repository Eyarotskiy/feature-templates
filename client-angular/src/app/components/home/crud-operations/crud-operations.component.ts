import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { DishData, DishUpdateData, UserData } from 'src/app/shared/types';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

@Component({
  selector: 'app-crud-operations',
  templateUrl: './crud-operations.component.html',
  styleUrls: ['./crud-operations.component.scss']
})
export class CrudOperationsComponent implements OnInit {
  menu?: DishData[];
  users?: UserData[];
  dishCreateName?: string;
  dishDeleteName?: string;
  dishOldUpdateName?: string;
  dishNewUpdateName?: string;

  constructor(private api: ApiService, private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.listen('getMenu').subscribe((data: any) => {
      this.menu = data;
    });
  }

  getData() {
    this.api.getData().subscribe((response: UserData[]) => {
      this.users = response;
    });
  }

  getMenu() {
    this.api.getMenu().subscribe((response: DishData[]) => {
      this.menu = response;
    });
  }

  saveDish() {
    if (!this.dishCreateName) return;

    this.webSocket.emit('saveDish', this.dishCreateName);
  }

  clearMenu() {
    this.webSocket.emit('clearMenu');
  }

  updateDish() {
    if (!this.dishOldUpdateName || !this.dishNewUpdateName) return;

    const payload: DishUpdateData = {
      oldDishName: this.dishOldUpdateName,
      newDishName: this.dishNewUpdateName,
    };
    this.webSocket.emit('updateDish', payload);
  }

  deleteDish() {
    if (!this.dishDeleteName) return;

    this.webSocket.emit('deleteDish', this.dishDeleteName);
  }
}
