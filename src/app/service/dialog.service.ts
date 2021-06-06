import { Injectable } from '@angular/core';
import { DetailComponent } from '../component/detail/detail.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDetailDialog(name: string): any {
    this.dialog.open(DetailComponent, {
      width : '500px',
      height: '600px',
      data: {
        pokemonName: name,
      }
    });
  }
}
