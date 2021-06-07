import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './component/detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { OverviewCardComponent } from './component/overview-card/overview-card.component';
import { MatInputModule } from '@angular/material/input';
import { FilterComponent } from './component/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './component/overview/overview.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PersonalListComponent } from './component/personal-list/personal-list.component';
import { HomeComponent } from './component/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AboutComponent } from './component/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    OverviewCardComponent,
    FilterComponent,
    OverviewComponent,
    PersonalListComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
