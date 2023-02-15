import { Injectable } from '@angular/core';
import { Group } from './group';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  group: Group[] = [
  ];

  getGroup() {
    return JSON.parse(JSON.stringify(this.group));
  }

  updateGroup(groups: Group[]) {
    this.group = groups.map(group => { group.newRecord = false; return group; });
  }

  deleteGroup(deletegroup: Group) {
    this.group = this.group.filter(v => v.groupId != deletegroup.groupId);
  }

  vaildate(groups: Group[]) {

    this.group.forEach((group: Group) => {


    })
  }
}
