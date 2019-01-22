import { Game } from './game/game.model';
import { Division } from './division/division.model';
import { VoiceChat, UnitType } from './voice-chat/voice-chat.model';

export class Player {
  private _id: string;
  private _name: string;
  private _dateAdded: Date;
  private _games: Game[];
  private _divisions: Division[];
  private _voiceChats: VoiceChat[];
  private _chef: string;

  private divTemp: UnitType;

  constructor(
    name: string,
    games: Game[] = [],
    divisions: Division[] = [],
    voiceChats: VoiceChat[] = [],
    dateAdded: Date = null
  ) {
    this._name = name;
    this._games = games;
    this._divisions = divisions;
    this._voiceChats = voiceChats;
    this._dateAdded = dateAdded ? dateAdded : new Date();
  }

  static fromJSON(json: any): Player {
    const rec = new Player(
      json.name,
      json.games.map(Game.fromJSON),
      json.divisions.map(Division.fromJSON),
      json.voiceChats.map(VoiceChat.fromJSON),
      json.created
    );
    rec._id = json._id;
    rec._chef = json.chef;
    console.log(rec);
    return rec;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      games: this._games.map(game => game.toJSON()),
      divisions: this._divisions.map(div => div.toJSON()),
      voiceChats: this._voiceChats.map(vc => vc.toJSON()),
      created: this._dateAdded,
      chef: this._chef
    };
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get dateAdded(): Date {
    return this._dateAdded;
  }
  get games(): Game[] {
    return this._games;
  }

  get divisions(): Division[] {
    return this._divisions;
  }

  get voiceChats(): VoiceChat[] {
    return this._voiceChats;
  }
  get test(): String {

    for (let div of this._divisions) {
      /*       if (div.unit > this.divTemp) {
      
            } */
      console.log(div);
      return div.unit.toString();
    }
  }

  get chef(): string {
    return this._chef;
  }

  addGame(game: Game) {
    this._games.push(game);
  }

  addDivision(div: Division) {
    this._divisions.push(div);
  }

  addVoiceChat(vc: VoiceChat) {
    this._voiceChats.push(vc);
  }
}
