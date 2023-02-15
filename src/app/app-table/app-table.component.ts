import { Component, OnInit } from '@angular/core';
import { columnDefinition, TabId } from '../ColumnDefinition';
import { GroupService } from '../Data/group.service';
import { UserAccessService } from '../Data/user-access.service';
import { UserService } from '../Data/user.service';
import { DialogService, DialogType } from '../dialog/dialog.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
})
export class AppTableComponent implements OnInit {
  _data: any[] = [];
  _tableViewData: any[] = []; //temp object for display

  _columnDefinition: any[] = [];
  _viewSelected = TabId.User;
  isEditMode: boolean = false;
  activeId: number = TabId.User; //Start by User Tab

  searchText: string = '';

  constructor(
    public userService: UserService,
    public groupService: GroupService,
    public userAccessService: UserAccessService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    //Init current selected Tab to User
    this._viewSelected = this.activeId;

    this.refreshTable();
  }

  changeMode() {
    this.isEditMode = !this.isEditMode;

    this.refreshTable();
  }

  refreshTable() {
    this._columnDefinition = columnDefinition.filter(
      (columnDefinition) => columnDefinition.tabId === this._viewSelected
    );
    this._tableViewData = [];
    if (this._viewSelected == TabId.User) {
      this._data = this.userService.getUser();
    } else if (this._viewSelected == TabId.UserAccess) {
      this._data = this.userAccessService.getuserAccess();
    } else if (this._viewSelected == TabId.Group) {
      this._data = this.groupService.getGroup();
    } else {
      this._data = [];
    }

    //clone obejct without reference
    this._tableViewData = JSON.parse(JSON.stringify(this._data));
  }

  // Filter data when user input anything
  public inputChange(event: any, key: any) {
    // User Tab
    if (this._viewSelected == TabId.User) {
      this.userFilter();
    }
  }

  // pop up ref
  // https://ng-bootstrap.github.io/releases/13.x/#/components/modal/examples
  deleteRecord(deleteUser: any) {
    if (this._viewSelected == TabId.User) {
      this.userService.deleteUser(deleteUser);
    }

    this.refreshTable();
  }

  addRecord() {
    if (this._viewSelected == TabId.User) {
      let newUser = {
        userId: '',
        firstName: '',
        lastName: '',
        loginName: '',
        password: '',
        email: '',
        newRecord: true,
      };
      this._tableViewData.splice(0, 0, newUser);
    }
  }

  save() {
    if (this._viewSelected == TabId.User) {
      //Do each records validation
      this.userService.vaildate(
        JSON.parse(JSON.stringify(this._tableViewData))
      );

      this.userService.updateUser(
        JSON.parse(JSON.stringify(this._tableViewData))
      );
    }

    this.changeMode();
  }

  onTabChange(): void {
    this._viewSelected = this.activeId;
    this.refreshTable();
  }

  //Disable Save button
  saveBtnDisabled() {
    if (this._viewSelected == TabId.User) {
      //Is data equals
      if (JSON.stringify(this._tableViewData) == JSON.stringify(this._data))
        return true;
      //Is empty input exist?
      let tempViewData = this._tableViewData.map((e) => e);
      tempViewData = tempViewData.filter((row) => {
        if (
          row.userId.length == 0 ||
          row.firstName.length == 0 ||
          row.lastName.length == 0 ||
          row.loginName.length == 0 ||
          row.password.length == 0
        )
          return true;
        return false;
      });
      //return JSON.stringify(this._tableViewData).includes('""');
      return tempViewData.length > 0;

      //return angular.equals(val1, val2);
    }
    return true;
  }

  onInputIdleave(id: string): void {
    if (id.length > 0) {
      let tempCount = 0;
      this._tableViewData.forEach(function (row) {
        if (row.userId == id) {
          tempCount++;
          if (tempCount >= 2) {
            console.log(row.userId);
            console.log('duplicate:' + id);
          }
        }
      });
      if (tempCount >= 2) {
        this.showDialog(id + ' already defined');
      }
    }
  }

  showDialog(msg: string) {
    this.dialogService.confirmThis(
      msg,
      function () {
        console.log('dsda');
      },
      function () { },
      DialogType.oneOKButton
    );
  }

  userFilter() {
    let userId = this._columnDefinition
      .find((column) => column.columnId === 'userId')
      ?.ngValue?.toLowerCase();
    let firstName = this._columnDefinition
      .find((column) => column.columnId === 'firstName')
      ?.ngValue?.toLowerCase();
    let lastName = this._columnDefinition
      .find((column) => column.columnId === 'lastName')
      ?.ngValue?.toLowerCase();
    let loginName = this._columnDefinition
      .find((column) => column.columnId === 'loginName')
      ?.ngValue?.toLowerCase();
    let email = this._columnDefinition
      .find((column) => column.columnId === 'email')
      ?.ngValue?.toLowerCase();

    if (userId || firstName || lastName || loginName || email) {
      let tempViewData = this._data.map((e) => e);
      //userId
      if (userId?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.userId.toLowerCase().includes(userId)) return true;
          return false;
        });
      }
      //firstName
      if (firstName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.firstName.toLowerCase().includes(firstName)) return true;
          return false;
        });
      }
      //lastName
      if (lastName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.lastName.toLowerCase().includes(lastName)) return true;
          return false;
        });
      }
      //loginName
      if (loginName?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.loginName.toLowerCase().includes(loginName)) return true;
          return false;
        });
      }
      //email
      if (email?.length > 0) {
        tempViewData = tempViewData.filter((row) => {
          if (row.email.toLowerCase().includes(email)) return true;
          return false;
        });
      }

      this._tableViewData = tempViewData;
    } else {
      this._tableViewData = JSON.parse(JSON.stringify(this._data));
    }
  }
}
