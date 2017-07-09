import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    template: `
        <h1 class="title is-unselectable">Welcome</h1>

        <a class="button is-warning" routerLink="/create-duel">Create a duel</a>

        <h2 class="subtitle is-unselectable">Or...</h2>
        
        <div class="field has-addons has-addons-centered">
            <p class="control">
                <input class="input" [(ngModel)]="duelId" type="text" placeholder="Insert duel number, and..." />
            </p>
            <p class="control">
                <button class="button is-warning" [disabled]="!duelId" [routerLink]="['duel', duelId]">Join a duel</button>
            </p>
        </div>
    `,
    styles: [
        'h2 { margin-top: 20px; }'
    ]
})
export class HomeComponent { 
    duelId: number;
}
