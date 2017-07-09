import { Hero } from './../models/hero.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class DuelService {
    constructor(private http: Http) { }

    createDuel(heroes: Hero[]): Promise<any> {
        return this.http.post(`http://localhost:3000/api/duel`, heroes.map(hero => hero._id))
                .map(res => res.json())
                .toPromise();
    }

    getDuel(id: string): Promise<Hero[]> {
        return this.http.get(`http://localhost:3000/api/duel/${id}`)
                .map(res => res.json())
                .toPromise();
    }
    
    vote(id: string, hero: Hero) {
        return this.http.put(`http://localhost:3000/api/duel/`, { duel: id, hero: hero._id })
                .map(res => res.json())
                .toPromise();
    }
}
