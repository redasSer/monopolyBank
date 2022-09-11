import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayerService } from './player.service';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { BankComponent } from './bank/bank.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'login', component: LoginComponent},
  {path: 'transfer', component: TransferComponent},
  {path: 'bank', component: BankComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    TransferComponent,
    BankComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PlayerService, GameComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
