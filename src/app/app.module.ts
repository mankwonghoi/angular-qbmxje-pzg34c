import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserTableComponent } from './user-table/user-table.component';
import { MaskPasswordPipe } from './mask-password.pipe';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: UserTableComponent }]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    UserTableComponent,
    MaskPasswordPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
