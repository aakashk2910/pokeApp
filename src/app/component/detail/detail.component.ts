import { Component, Inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Pokemon } from '../../model/pokemon.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public pokemon: Pokemon;
  private error = '';

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
  ) {
    this.getPokemonDetails(data.pokemonName);
  }

  ngOnInit(): void {
  }

  getPokemonDetails(name: string): any {
    this.dataService.getDetails(name).subscribe(
      data => {
        this.pokemon = {
          id: data.id,
          name: this.dataService.capitalize(data.name),
          imgUrl: data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          type: data.types.map(x => this.dataService.capitalize(x.type.name)),
          stat: data.stats,
          baseExperience: data.base_experience,
          location: '',
          sprite: data.sprites.front_default,
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

  addPokemonToList(listName: string): void {
    if (!localStorage.getItem(listName)) {
      localStorage.setItem(listName, JSON.stringify([this.pokemon.name]));
      this.toastr.success(this.pokemon.name + ' added successfully to ' + listName, '');
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    } else {
      let list = JSON.parse(localStorage.getItem(listName));
      if (!list.includes(this.pokemon.name)) {
        list.push(this.pokemon.name);
        localStorage.setItem(listName, JSON.stringify(list));
        this.toastr.success(this.pokemon.name + ' added successfully to ' + listName, '');
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        this.toastr.warning(this.pokemon.name + ' already exist in ' + listName, '');
      }
    }
  }
}
