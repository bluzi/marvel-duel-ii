import { HeroComponent } from './../components/hero.component';
import { CreateDuelComponent } from './../pages/create-duel.page';
import { PageNotFoundComponent } from './../pages/not-found.page';
import { DuelComponent } from './../pages/duel.page';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './../pages/home.page';

import { RouterModule, Routes } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { HttpModule } from '@angular/http';
import { DuelService } from 'services/duel.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'duel/:id', component: DuelComponent },
  { path: 'create-duel', component: CreateDuelComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '404', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    DuelComponent,
    CreateDuelComponent,

    HeroComponent,

    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
  ],
  providers: [
    HeroService,
    DuelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
