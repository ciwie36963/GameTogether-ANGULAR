import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../player.model';
import { Game } from '../game/game.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() public player: Player;
  @Output() public deletePlayer = new EventEmitter<Player>();

  constructor() {}

  ngOnInit() {}

  removePlayer() {
    this.deletePlayer.emit(this.player);
  }

  get games(): Game[] {
    return this.player.games;
  }
}
