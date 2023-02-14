import { Component } from '@angular/core';
import { TableControlService } from '../table-control.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  activeId: number = this.tableControlService.selectedTab;
  constructor(public tableControlService: TableControlService) { }

  onClick(): void {
    console.log(this.activeId);
  }
}
