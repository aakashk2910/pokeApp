import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DialogService} from '../../service/dialog.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnChanges {

  pokemon: any;
  lowValue = 0;
  highValue = 5;

  @Input() listName: string;
  @Input() triggerChange: any;

  constructor(
    public dialogService: DialogService, 
    private toastr: ToastrService, 
    private dataService: DataService,
  ) { }

  ngOnChanges(): void {
    if(this.listName === 'MyList') {
      this.dataService.myList$.subscribe(list => this.pokemon = JSON.parse(list));
    } else {
      this.dataService.wishlist$.subscribe(list => this.pokemon = JSON.parse(list));
    }
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  deleteFromList(name: string) {
    let list = JSON.parse(localStorage.getItem(this.listName));
    list = list.filter(obj => obj !== name);
    localStorage.setItem(this.listName, JSON.stringify(list));
    this.toastr.info(name + ' deleted from ' + this.listName, '');
    if (this.listName === 'MyList') {
      this.dataService.editMyList(JSON.stringify(list));
    } else {
      this.dataService.editWishlist(JSON.stringify(list));
    }
  }

}
