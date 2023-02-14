import { Component, OnInit } from '@angular/core';
import { columnDefinition, TabId } from '../ColumnDefinition';
import { UserService } from '../Data/user.service';

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

  constructor(public userService: UserService) {}

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

    if (this._viewSelected == TabId.User) {
      this._data = this.userService.getUser();
    } else {
      this._data = [];
    }

    //clone obejct without reference
    this._tableViewData = JSON.parse(JSON.stringify(this._data));
  }

  // Filter data when user input anything
  public inputChange(event: any, key: any) {
    //console.log(event);

    //console.log(key);

    // User Tab
    if (this._viewSelected == TabId.User) {
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
        if (userId && userId.length > 0) {
          tempViewData = tempViewData.filter((row) => {
            if (userId && row.userId.toLowerCase().includes(userId))
              return true;
            return false;
          });
        }
        //firstName
        if (firstName && firstName.length > 0) {
          tempViewData = tempViewData.filter((row) => {
            if (firstName && row.firstName.toLowerCase().includes(firstName))
              return true;
            return false;
          });
        }
        //lastName
        if (lastName && lastName.length > 0) {
          tempViewData = tempViewData.filter((row) => {
            if (lastName && row.lastName.toLowerCase().includes(lastName))
              return true;
            return false;
          });
        }
        //firstName
        if (loginName && loginName.length > 0) {
          tempViewData = tempViewData.filter((row) => {
            if (loginName && row.loginName.toLowerCase().includes(loginName))
              return true;
            return false;
          });
        }
        //firstName
        if (email && email.length > 0) {
          tempViewData = tempViewData.filter((row) => {
            if (email && row.email.toLowerCase().includes(email)) return true;
            return false;
          });
        }
        //end TODO

        this._tableViewData = tempViewData;
      } else {
        this._tableViewData = JSON.parse(JSON.stringify(this._data));
      }
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
      this._data.splice(0, 0, newUser);
    }
  }

  save() {
    if (this._viewSelected == TabId.User) {
      //Do each records validation
      this.userService.updateUser(
        JSON.parse(JSON.stringify(this._tableViewData))
      );
    }

    this.changeMode();
  }

  onTabChange(): void {
    console.log(this.activeId);
    this._viewSelected = this.activeId;
    this.refreshTable();
  }

  saveBtnDisabled() {
    if (this._viewSelected == TabId.User) {
      return JSON.stringify(this._data).includes('""');
    }
    return true;
  }
}
