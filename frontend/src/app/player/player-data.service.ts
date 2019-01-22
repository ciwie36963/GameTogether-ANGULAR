import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './player.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Game } from './game/game.model';
import { Division } from './division/division.model';
import { VoiceChat } from './voice-chat/voice-chat.model';

@Injectable()
export class PlayerDataService {
  //private readonly _appUrl = '/API/';
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) {}

  get players(): Observable<Player[]> {
    return this.http
      .get(`${this._appUrl}/players/`)
      .pipe(map((list: any[]): Player[] => list.map(Player.fromJSON)));
  }

  addNewPlayer(player: Player): Observable<Player> {
    return this.http
      .post(`${this._appUrl}/players/`, player)
      .pipe(map(Player.fromJSON));
  }

  removePlayer(rec: Player): Observable<Player> {
    return this.http
      .delete(`${this._appUrl}/player/${rec.id}`)
      .pipe(map(Player.fromJSON));
  }

  addGameToPlayer(game: Game, rec: Player): Observable<Game> {
    const theUrl = `${this._appUrl}/player/${rec.id}/games`;
    return this.http.post(theUrl, game).pipe(map(Game.fromJSON));
  }

  addDivisionToPlayer(div: Division, rec: Player): Observable<Division> {
    const theUrl = `${this._appUrl}/player/${rec.id}/divisions`;
    return this.http.post(theUrl, div).pipe(map(Division.fromJSON));
  }

  addVoiceChatToPlayer(vc: VoiceChat, rec: Player): Observable<VoiceChat> {
    const theUrl = `${this._appUrl}/player/${rec.id}/voiceChats`;
    return this.http.post(theUrl, vc).pipe(map(VoiceChat.fromJSON));
  }

  getPlayer(id: string): Observable<Player> {
    return this.http
      .get(`${this._appUrl}/player/${id}`)
      .pipe(map(Player.fromJSON));
  }
}
