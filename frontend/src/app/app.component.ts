import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from './player';
import { PlayerService } from './player.service';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public players: Player[] = [];

  refreshPlayers = new BehaviorSubject<boolean>(true);
  
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
     }

  tohide: boolean = true;


  public onAddPlayer(addForm: NgForm): void {
    this.playerService.addPlayer(addForm.value).subscribe(
      (response: Player) => {console.log(response); this.playerService.getAllPlayers},
      (error: HttpErrorResponse) => {alert(error.message)}
    );
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
