import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Player } from './player.model';
import { Observable } from 'rxjs/Observable';
import { PlayerDataService } from './player-data.service';

@Injectable()
export class PlayerResolver implements Resolve<Player> {
  constructor(private playerService: PlayerDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Player> {
    return this.playerService.getPlayer(route.params['id']);
  }
}
