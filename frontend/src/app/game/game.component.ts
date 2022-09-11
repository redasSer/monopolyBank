import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { interval, Observable, of, Subject, switchMap, startWith, flatMap, map, mapTo,timer,takeWhile } from 'rxjs'
import { Router } from '@angular/router';
let timer$ = timer(2000,1000);



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public players!: Observable<Player[]>;
  public currentPlayer!: Player;
  logged = false;
  

  constructor(private playerService: PlayerService, public router: Router) {
   }

  
  
  ngOnInit(): void {
    this.logged = true;
    this.getPlayerFirstTime();
    console.log(sessionStorage.length)
    console.log("Logged in as: " + sessionStorage.getItem('token'))
    if(sessionStorage.length === 0) {
          this.router.navigate(["/login"]);
        }
    
  }
 
  public getPlayerFirstTime(): void{
    this.playerService.getAllPlayers().subscribe(
      (response: Player[]) => {
        for(let player of response){
          if(player.username === sessionStorage.getItem('token')){
            this.currentPlayer = player;
          }
          
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        return null;
      }
    );
    this.getPlayer();
  }

  public getPlayer(): void{
      setInterval(() => {
        if(this.logged === true){
          this.playerService.getPlayerByUsername(sessionStorage.getItem('token')!).subscribe(
            (res) => this.currentPlayer = res
          );
        }
      }, 1000);
  }

  public deletePlayer(player: Player): void{
    this.playerService.deletePlayer(player.id).subscribe(
      (response: void) => {console.log(response)},
      (error: HttpErrorResponse) => {alert(error.message)}
    );
    console.log("istrintas: " + player.id)
  }

  public logout(): void{
    this.logged = false;
    sessionStorage.clear();
    this.playerService.deletePlayer(this.currentPlayer.id).subscribe();
    this.router.navigate(["/login"]);

    console.log("logged out")
  }
  
  public addMoney(player: Player): void{
    this.playerService.addMoney(player.id, 1000000).subscribe(
      (response: void) => {console.log(response)},
      (error: HttpErrorResponse) => {alert(error.message)}
    );
    console.log("added " + player.id)
  }
}
