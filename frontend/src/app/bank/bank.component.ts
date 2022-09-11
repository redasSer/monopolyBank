import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor(private playerService: PlayerService, private router: Router) { 
    
  }

  currentPlayer!: Player;
  selectedPlayer!: Player;


  ngOnInit(): void {
    this.getPlayer();
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
  public addMoney(addForm: NgForm){
    if(addForm.value.multiplier === "million"){
      this.playerService.addMoney(this.currentPlayer.id, addForm.value.amount * 1000000).subscribe(
      (resp) => {console.log(resp)},
      (error: HttpErrorResponse) => {alert(error.message)}
      )
    }else if(addForm.value.multiplier === "thousand"){
      this.playerService.addMoney(this.currentPlayer.id, addForm.value.amount * 1000).subscribe(
        (resp) => {console.log(resp)},
        (error: HttpErrorResponse) => {alert(error.message)}
        )
    }
    this.router.navigate([("/game")])
  }

  public subtractMoney(addForm: NgForm){
    if(addForm.value.multiplier === "million"){
      this.playerService.subtractMoney(this.currentPlayer.id, addForm.value.amount * 1000000).subscribe(
      (resp) => {console.log(resp)},
      (error: HttpErrorResponse) => {alert(error.message)}
      )
    }else if(addForm.value.multiplier === "thousand"){
      this.playerService.subtractMoney(this.currentPlayer.id, addForm.value.amount * 1000).subscribe(
        (resp) => {console.log(resp)},
        (error: HttpErrorResponse) => {alert(error.message)}
        )
    }
    this.router.navigate([("/game")])
  }

  public plusTwoMillion(){
    this.playerService.addMoney(this.currentPlayer.id, 2000000).subscribe(
      (resp) => {console.log(resp)},
      (error: HttpErrorResponse) => {alert(error.message)}
      )
      this.router.navigate([("/game")])
  }
}


