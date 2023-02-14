import { Injectable } from '@angular/core';
import { User, user } from './Data/User';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  user: User[] = [];
  selectedTab: number;

  constructor() {
    this.user = user;
    this.selectedTab = 1;
  }

  getUser() {
    return this.user;
  }

  addUser() {
    //to be continue...
  }

  removeUser() {
    //to be continue...
  }

  updateUser() {
    //to be continue...
  }
}
