import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filter: any;
  typeArray: any = [];
  triggerChange = 0;
  constructor(private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataService.getTypeDropdown().subscribe(
      data => {
        this.typeArray = data.results;
      },
      err => {
        this.toastr.warning('Fetch Operation Failed', '');
        console.log(err.message);
      }
    );
  }

  search(f): any {
    this.filter = f.value;
  }
}
