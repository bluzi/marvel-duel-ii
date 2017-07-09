import { DuelService } from './../services/duel.service';
import { HeroService } from './../services/hero.service';
import { Hero } from './../models/hero.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    template: `
        <div class="container">
            <h1 class="title is-unselectable">Duel</h1>
            <h2 class="subtitle is-marginless is-unselectable">
                "To make democracy work, we must be a nation of participants, 
                    not simply observers. One who does not vote has no right to complain."
            </h2>
            <h3 class="is-unselectable">- Captain America</h3>

            <h2 class="duel-number">
                <span class="is-unselectable">Here's your duel number, send it to your friends:</span> 
                <strong>{{ duelId }}</strong>
            </h2>

            <div class="notification is-success" [hidden]="!votedFor">
                <button class="delete" (click)="votedFor = undefined"></button>
                Thank you for voting, <em>{{ votedFor.name }}</em> is freaking awesome!
            </div>

            <div class="columns" *ngFor="let heroRow of heroes">
                <div class="column" *ngFor="let hero of heroRow">
                    <app-hero [hero]="hero" [selected]="votedFor && hero._id == votedFor._id" (click)="vote(hero)"></app-hero>
                </div>
            </div>
        </div>
    `,
    styles: [
        'h2 { font-style: italic; }',
        'h3 { margin-bottom: 20px; }',
        '.delimiter { margin: 0 10px; display: inline-block; }',
        '.duel-number { margin-bottom: 10px; }'
    ]
})
export class DuelComponent implements OnInit {
    heroes: Hero[][];
    duelId: string;
    votedFor: Hero;

    constructor(private heroService: HeroService, private duelService: DuelService,
                private activatedRoute: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(async (params: Params) => {
            this.duelId = params['id'];

            this.duelService.getDuel(this.duelId)
                .then(heroes1d => {
                    this.heroes = [];
                    while (heroes1d.length)
                        this.heroes.push(heroes1d.splice(0, 5));
                })
                .catch(() => this.router.navigate(['/404']));
        });
    }

    vote(hero: Hero) {
        this.duelService.vote(this.duelId, hero)
            .then(() => this.votedFor = hero);
    }
}
