import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameComponent } from '../game/game.component';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private playerService: PlayerService, private router: Router) { 
    
  }

  currentPlayer!: Player;
  players!: Observable<Player[]>;
  selectedPlayer!: Player;


  ngOnInit(): void {
    this.getPlayer();
    this.getAllPlayers();
  }

  public getAllPlayers(){
    this.playerService.getAllPlayers().subscribe(
      (resp) => this.players = of(resp),
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  public getPlayer(): void{
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
    
  }
  public transferMoney(addForm: NgForm){
    if(addForm.value.multiplier === "million"){
      this.playerService.transferMoney(this.currentPlayer.id, addForm.value.selectedPlayer.id, addForm.value.amount * 1000000).subscribe(
      (resp) => {console.log(resp)},
      (error: HttpErrorResponse) => {alert(error.message)}
      )
    }else if(addForm.value.multiplier === "thousand"){
      this.playerService.transferMoney(this.currentPlayer.id, addForm.value.selectedPlayer.id, addForm.value.amount * 1000).subscribe(
        (resp) => {console.log(resp)},
        (error: HttpErrorResponse) => {alert(error.message)}
        )
    }
    this.router.navigate([("/game")])
  }
}
