import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Player } from './player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(`${this.apiServerUrl}/player/all`);
  }
  public getPlayer(id: number): Observable<Player>{
    return this.http.get<Player>(`${this.apiServerUrl}/player/${id}`);
  }
  public addPlayer(player: Player): Observable<Player>{
    return this.http.post<Player>(`${this.apiServerUrl}/player/add`, player);
  }
  public deletePlayer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/player/delete/${id}`);
  }
  public addMoney(id: number, amount: number): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/player/money/add/${id}/${amount}`, null);
  }
  public subtractMoney(id: number, amount: number): Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/player/money/subtract/${id}/${amount}`, null);
  }
  public getPlayerByUsername(username: String): Observable<Player>{
    return this.http.get<Player>(`${this.apiServerUrl}/player/get/${username}`);
  }
  public transferMoney(fromId: number, toId:number, amount: number){
    return this.http.post<any>(`${this.apiServerUrl}/player/money/transfer/${fromId}/${toId}/${amount}`, null);
  }
}
