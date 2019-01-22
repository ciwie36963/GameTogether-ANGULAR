import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../player.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  private _player: Player;
  public errorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private playerDataService: PlayerDataService
  ) {}

  get player(): Player {
    return this._player;
  }
  ngOnInit() {
    this.route.data.subscribe(
      item => (this._player = item['player']),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve player: ${error.error}`;
      }
    );
  }
}
