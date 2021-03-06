import { Component, OnInit, Input} from '@angular/core';
import { Game } from './game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() public game : Game;

  constructor() { }

  ngOnInit() {}
}
