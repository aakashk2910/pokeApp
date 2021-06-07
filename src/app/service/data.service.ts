import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


const API_URL = 'https://pokeapi.co/api/v2/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myList = new BehaviorSubject<any>(localStorage.getItem('MyList'));
  myList$ = this.myList.asObservable();

  private wishlist = new BehaviorSubject<any>(localStorage.getItem('Wishlist'));
  wishlist$ = this.wishlist.asObservable();

  constructor(private http: HttpClient) { }

  getDetails(name: string): Observable<any> {
    return this.http.get(API_URL + 'pokemon/' + name, { responseType: 'json' });
  }

  getPokemonsByType(type: number): Observable<any> {
    return this.http.get(API_URL + 'type/' + type, { responseType: 'json' });
  }

  capitalize(text: string): string {
    if (typeof text !== 'string') { return ''; }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getTypeDropdown(): Observable<any> {
    return this.http.get(API_URL + 'type', { responseType: 'json' });
  }

  getTypeNumberFromUrl(url: string): number {
    const typeNumber = url.split('/');
    return +typeNumber[typeNumber.length - 2];
  }

  getAllPokemons(): Observable<any> {
    return this.http.get(API_URL + 'pokemon?limit=1118&offset=200', { responseType: 'json' });
  }

  editMyList(list){
    this.myList.next(list);
  }

  editWishlist(list) {
    this.wishlist.next(list);
  }
}
