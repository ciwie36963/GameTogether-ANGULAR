import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import { Subject } from 'rxjs/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  public filterPlayerName: string;
  public filterPlayer$ = new Subject<string>();

  public errorMsg: string;

  private _players: Player[];

  constructor(private _playerDataService: PlayerDataService) {
    this.filterPlayer$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterPlayerName = val));
  }

  ngOnInit(): void {
    this._playerDataService.players.subscribe(
      players => (this._players = players),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve players: ${error.error}`;
      }
    );
  }

  get players() {
    return this._players;
  }

  removePlayer(player: Player) {
    this._playerDataService.removePlayer(player).subscribe(
      item => (this._players = this._players.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing players for ${
          player.name
        }: ${error.error}`;
      }
    );
  }
}
