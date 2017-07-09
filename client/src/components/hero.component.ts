import { Component, Input } from '@angular/core';
import { Hero } from '../models/hero.model';

@Component({
    selector: 'app-hero',
    template: `
        <figure class="image is-square is-unselectable" [class.is-active]='selected'>
            <img [src]="hero.thumbnail" [alt]="hero.name" [title]="hero.name" />
        </figure>
    `,
    styles: [
        ':host { cursor: pointer; }',
        'figure { border: 3px solid transparent; filter: grayscale(100%);  }', 
        'figure.is-active { border-color: white; filter: grayscale(0%); }',
        'figure:not(.is-active):hover { filter: grayscale(75%); }',
    ]
})
export class HeroComponent { 
    @Input() hero: Hero;
    @Input() selected: boolean;
}
