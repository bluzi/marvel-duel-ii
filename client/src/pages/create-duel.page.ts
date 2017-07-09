import { DuelService } from 'services/duel.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Hero } from './../models/hero.model';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';

@Component({
    template: `
        <div class="container">
            <h1 class="title is-unselectable">Select <strong>10</strong> heroes to participate in the duel</h1>
            
            <nav class="level">
                <div class="level-left">
                    <button class="pagination-previous button is-warning" [disabled]="!page" (click)="perviousPage()">Previous</button>
                </div>

                <div>
                    <button class="button is-warning submit" [disabled]="selectedHeroes.length !== 10" (click)="done()">
                        Finish ({{ selectedHeroes.length }}/10)
                    </button>
                </div>

                <div class="level-right">
                    <button class="pagination-next button is-warning" (click)="nextPage()">Next page</button>
                </div>
            </nav>

            <div class="columns" *ngFor="let heroRow of heroes">
                <div class="column" *ngFor="let hero of heroRow">
                    <app-hero [hero]="hero" [selected]="isSelected(hero)" (click)="selectHero(hero)"></app-hero>
                </div>
            </div>

            <nav class="level">
                <div class="level-left">
                    <button class="pagination-previous button is-warning" [disabled]="!page" (click)="perviousPage()">Previous</button>
                </div>

                <div>
                    <button class="button is-warning submit" [disabled]="selectedHeroes.length !== 10" (click)="done()">
                        Finish ({{ selectedHeroes.length }}/10)
                    </button>
                </div>

                <div class="level-right">
                    <button class="pagination-next button is-warning" (click)="nextPage()">Next page</button>
                </div>
            </nav>
        </div>
    `,
    styles: [
        '.submit { margin-bottom: 10px; }'
    ]
})
export class CreateDuelComponent implements OnInit {
    heroes: Hero[][];
    selectedHeroes: Hero[];
    page: number;

    constructor(private activatedRoute: ActivatedRoute, private router: Router,
                private heroService: HeroService, private duelService: DuelService) {
        this.heroes = [];
        this.selectedHeroes = [];
    }

    ngOnInit() {
        this.loadHeroes(0);
    }

    private loadHeroes(page: number) {
        this.page = page;

        this.heroService.getHeroes(this.page).subscribe(heroes1d => {
            this.heroes = [];

            while (heroes1d.length)
                this.heroes.push(heroes1d.splice(0, 5));
        });
    }

    selectHero(hero: Hero) {
        if (this.selectedHeroes.find(h => h._id == hero._id))
            this.selectedHeroes.splice(this.selectedHeroes.indexOf(hero), 1);
        else if (this.selectedHeroes.length === 10)
            alert('You already selected 10 heroes');
        else
            this.selectedHeroes.push(hero);

        console.log(this.selectedHeroes);
    }

    isSelected(hero: Hero): boolean {
        return !!this.selectedHeroes.find(h => h._id == hero._id)
    }

    done() {
        this.duelService.createDuel(this.selectedHeroes)
            .then(duelId => this.router.navigate(['/duel', duelId]));
    }

    nextPage() {
        this.loadHeroes(this.page + 1);
    }

    perviousPage() {
        if (this.page) {
            this.loadHeroes(this.page - 1);
        }
    }
}
