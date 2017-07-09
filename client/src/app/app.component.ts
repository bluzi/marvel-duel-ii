import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <a routerLink="/" title="Marvel Duel - Part II">
      <figure class="image is-128x128 auto-margin is-unselectable">
        <img src="assets/images/logo.png">
      </figure>
    </a>
    
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
