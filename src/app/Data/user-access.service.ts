import { Injectable } from '@angular/core';
import { UserAccess } from './user-access';
@Injectable({
  providedIn: 'root',
})
export class UserAccessService {
  userAccess: UserAccess[] = [
    {
      userId: 'wewe',
      groupId: 'group3',
      dateOfRelationshipCreation: '2023/01/01',
      newRecord: false,
    },
  ];

  getuserAccess() {
    return JSON.parse(JSON.stringify(this.userAccess));
  }

  updateuserAccess(userAccesss: UserAccess[]) {
    this.userAccess = userAccesss.map((userAccess) => {
      userAccess.newRecord = false;
      return userAccess;
    });
  }

  deleteuserAccess(deleteuserAccess: UserAccess) {
    this.userAccess = this.userAccess.filter(
      (v) => v.userId != deleteuserAccess.userId
    );
  }

  vaildate(userAccesss: UserAccess[]) {
    this.userAccess.forEach((userAccess: UserAccess) => {});
  }
}
