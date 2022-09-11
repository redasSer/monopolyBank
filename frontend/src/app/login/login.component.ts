import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public players: Player[] = [];
  private playerExist: boolean = false;
  refreshPlayers = new BehaviorSubject<boolean>(true);
  
  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    
    this.playerExist = false;
    this.getPlayers();
    this.sleep(1500);
    if(sessionStorage.length > 0){
      this.router.navigate(["/game"])
    }
      
    }

   sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

  public onAddPlayer(addForm: NgForm): void {

    for(let player of this.players){
      if(addForm.value.username === player.username){
        console.log("found " + player.username)
        this.playerExist = true;
        sessionStorage.setItem('token', player.username);
        this.router.navigate(["/game"]);
        
      }
        
        
    }
    if(this.playerExist === false){
      this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {
        sessionStorage.setItem('token', response.username);
        console.log(response); 
        this.router.navigate(["/game"]);
      },
      (error: HttpErrorResponse) => {alert(error.message)}
      
    );

    this.playerExist;
    }
    
  }


  public getPlayers(): void{
    this.playerService.getAllPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
