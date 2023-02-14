import { Component, OnInit } from '@angular/core';
import { columnDefinition, TabId } from '../ColumnDefinition';
import { User } from '../Data/User';
import { TableControlService } from '../table-control.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
})
export class AppTableComponent implements OnInit {
  _data: User[] | undefined;
  _tableViewData: any;

  _columnDefinition: any[] | undefined;
  _viewSelected = TabId.User;
  isEditMode: boolean = false;
  activeId: number = this.tableControlService.selectedTab;

  searchText: string | undefined;

  constructor(public tableControlService: TableControlService) {}

  ngOnInit(): void {
    //Assign current selected Tab
    this._viewSelected = TabId.User; //to be change to selected tab...
    //Get columnDefinition by selected Tab

    this.refreshTable();
  }

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }

  refreshTable() {
    this._columnDefinition = columnDefinition.filter(
      (columnDefinition) => columnDefinition.tabId === this._viewSelected
    );

    if (this._viewSelected == TabId.User) {
      this._data = this.tableControlService.getUser();
    }

    //clone obejct without reference
    this._tableViewData = this._data?.map((e) => e);
  }

  public inputChange(event: any, key: any) {}

  onClick(): void {
    console.log(this.activeId);
    this._viewSelected = this.activeId;
    this.refreshTable();
  }
}
