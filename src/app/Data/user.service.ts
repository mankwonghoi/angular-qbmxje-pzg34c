import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User[] = [
    {
      userId: 'dsads',
      firstName: 'Tony',
      lastName: 'Wong',
      loginName: 'tonywong',
      password: '1234567',
      email: 'tonywong@gmail.com',
    },
    {
      userId: 'wewe',
      firstName: 'Ben',
      lastName: 'Pong',
      loginName: 'benpong',
      password: '1234567',
      email: 'benpong@gmail.com',
    },
    {
      userId: 'rere',
      firstName: 'Peter',
      lastName: 'Chan',
      loginName: 'peterchan',
      password: '1234567',
      email: 'peterchan@gmail.com',
    },
    {
      userId: 'qqq',
      firstName: 'Sandy',
      lastName: 'Pui',
      loginName: 'sandypui',
      password: '1234567',
      email: 'sandypui@gmail.com',
    },
    {
      userId: 'zxcc',
      firstName: 'Ken',
      lastName: 'Yi',
      loginName: 'kenyi',
      password: '1234567',
      email: 'kenyi@gmail.com',
    },
  ];

  getUser() {
    return this.user;
  }

  updateUser(users: User[]) {
    this.user = users;
  }

  vaildate(users: User[]) {

    this.user.forEach((user: User) => {


    })
  }
}
