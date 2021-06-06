import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DialogService} from '../../service/dialog.service';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(public dialogService: DialogService) { }

  ngOnChanges(): void {
    this.pokemon = JSON.parse(localStorage.getItem(this.listName));
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
