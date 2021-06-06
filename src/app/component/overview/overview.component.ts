import { Component, Input, OnChanges } from '@angular/core';
import { DataService} from '../../service/data.service';
import { PageEvent } from '@angular/material/paginator';
import { DialogService } from '../../service/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnChanges {

  pokemonList = [];
  error = '';
  dataFetched = false;

  lowValue = 0;
  highValue = 10;

  @Input() filter: any;
  @Input() triggerChange: any;
  constructor(
      private dataService: DataService, 
      public dialogService: DialogService, 
      private toastr: ToastrService,
    ) { 
    this.dataService.getAllPokemons().subscribe(
      data => {
        this.pokemonList = data.results;
        this.pokemonList = this.pokemonList.map(x => x.name);
        this.dataFetched = true;
      },
      err => {
        this.toastr.warning('Fetch Operation Failed', '');
        console.log(err.message);
      }
    );
  }

  ngOnChanges(): void {
    this.getList();
  }

  getList(): any {
    if(!this.filter) {
      this.dataService.getAllPokemons().subscribe(
        data => {
          this.pokemonList = data.results;
          this.pokemonList = this.pokemonList.map(x => x.name);
          this.dataFetched = true;
        },
        err => {
          this.toastr.warning('Fetch Operation Failed', '');
          console.log(err.message);
        }
      );
    } else {
      if (this.filter.type === -1 || this.filter.type === '') {
        this.pokemonList = [];
        if (!this.filter.name) {
          this.dataService.getAllPokemons().subscribe(
            data => {
              this.pokemonList = data.results;
              this.pokemonList = this.pokemonList.map(x => x.name);
              this.dataFetched = true;
            },
            err => {
              this.toastr.warning('Fetch Operation Failed', '');
              console.log(err.message);
            }
          );
        } else {
          this.pokemonList = [];
          this.pokemonList.push(this.filter.name);
          this.dataFetched = true;
        }
      } else {
        if (!this.filter.name) {
          this.pokemonList = [];
          this.dataService.getPokemonsByType(this.filter.type).subscribe(
            data => {
              this.pokemonList = data.pokemon;
              this.pokemonList = this.pokemonList.map(x => x.pokemon.name);
              this.dataFetched = true;
            },
            err => {
              this.toastr.warning('Fetch Operation Failed', '');
              console.log(err.message);
            }
          );
        } else {
          this.pokemonList = [];
          this.dataService.getPokemonsByType(this.filter.type).subscribe(
            data => {
              const list = data.pokemon.map(x => x.pokemon.name);
              if (list.includes(this.filter.name)) {
                this.pokemonList.push(this.filter.name);
                this.dataFetched = true;
              }
            },
            err => {
              this.toastr.warning('Fetch Operation Failed', '');
              console.log(err.message);
            }
          );
        }
      }
    }
  }

  openDetails(pokemon) {
    this.dialogService.openDetailDialog(pokemon);
    this.triggerChange += 1;
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
