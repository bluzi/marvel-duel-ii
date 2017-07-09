import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class='container'>
            <h1 class="title is-unselectable">404: Page not found</h1>
            <h2 class="subtitle is-unselectable">{{ sentence }} </h2>
        </div>
    `
})
export class PageNotFoundComponent implements OnInit { 
    sentence: string;
    
    ngOnInit() {
        const sentences = [
            'This indicdent will be reported to S.H.I.E.L.D.',
            'My Spider-Sense is tingling!',
            '"With great power, comes great irresponsibility"',
        ];

        this.sentence = sentences[Math.floor(Math.random() * sentences.length)];
    }
}
