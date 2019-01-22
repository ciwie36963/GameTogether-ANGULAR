import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player.model';

@Pipe({
  name: 'playerFilter'
})
export class PlayerFilterPipe implements PipeTransform {
  
  transform(players: Player[], name: string): Player[] {
    if (!name || name.length === 0) {
      return players;
    }
    return players.filter(rec =>
      rec.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }
}