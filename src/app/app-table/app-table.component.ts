import { Component, OnInit } from '@angular/core';
import {
  columnDefinition,
  ColumnDefinition,
  ColumnId,
} from '../ColumnDefinition';
import { User } from '../Data/User';
import { TableControlService } from '../table-control.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
})
export class AppTableComponent implements OnInit {
  _data: User[] | undefined;

  _columnDefinition: ColumnDefinition | undefined;
  _columnHeader: string[] | undefined;
  _viewSelected = ColumnId.User;

  searchText: string | undefined;

  constructor(public tableControlService: TableControlService) {}

  _data$: User[] | undefined;

  ngOnInit(): void {
    //Assign current selected Tab
    this._viewSelected = ColumnId.User; //to be change to selected tab...
    console.log(this.tableControlService.selectedTab);
    //Get columnDefinition by selected Tab
    this._columnDefinition = columnDefinition.find(
      (columnDefinition) => columnDefinition.columnId === this._viewSelected
    );
    if (this._columnDefinition) {
      this._columnHeader = this._columnDefinition.columnHeader;
    }

    if (this._viewSelected == ColumnId.User) {
      this._data = this.tableControlService.getUser();
    }
  }

  public inputChange(event: any, key: any) {
    console.log(event);
    console.log(key);
  }
}
