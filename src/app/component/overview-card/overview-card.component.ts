import {Component, Inject, Input, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pokemon } from '../../model/pokemon.model';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.css']
})
export class OverviewCardComponent implements OnInit {

  public pokemon: Pokemon;
  private error = '';

  @Input() name: string;

  constructor(private dataService: DataService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getPokemonDetails(this.name);
  }

  getPokemonDetails(name: string): any {
    this.dataService.getDetails(name).subscribe(
      data => {
        this.pokemon = {
          id : data.id,
          name : this.dataService.capitalize(data.name),
          imgUrl : data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default,
          height : data.height,
          weight : data.weight,
          type : this.dataService.capitalize(data.types[0].type.name),
          stat : data.stats,
          baseExperience : data.base_experience,
          location : '',
          sprite : data.sprites.front_default,
          moves: data.moves,
          abilities: data.abilities,
        };
      },
      err => {
        this.toastr.warning('Fetch Operation Failed', '');
        console.log(err.message);
      }
    );
  }

}
