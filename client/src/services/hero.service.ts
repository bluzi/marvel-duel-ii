import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class HeroService {
    constructor(private http: Http) { }

    getHeroes(page = 0): Observable<Hero[]> {
        return this.http.get(`http://localhost:3000/api/hero/${page}`)
                .map(res => res.json());
    }
}
