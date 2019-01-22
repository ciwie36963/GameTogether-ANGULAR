export enum UnitType {
  None,
  Battlefield,
  Dota,
  League_Of_Legends,
  Rocket_League
}
export class GameUnit {
  constructor(private _amount: number, private _unit: UnitType) {}
  get amount(): number {
    return this._amount;
  }
  get unit(): UnitType {
    return this._unit;
  }
}
export class Game {
  private _id: string;
  private _name: string;
  private _gameunit: GameUnit;

  static fromJSON(json): Game {
    const rec = new Game(json.gamename, json.gameAmount, json.gameUnit);
    rec._id = json._id;
    return rec;
  }

  constructor(
    gamename: string,
    gameAmount: number = 1,
    gameUnit: UnitType = UnitType.None
  ) {
    this._name = gamename;
    this._gameunit = new GameUnit(gameAmount, gameUnit);
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
  get amount(): number {
    return this._gameunit.amount;
  }
  get unit(): UnitType {
    return this._gameunit.unit;
  }

  toJSON() {
    return {
      _id: this._id,
      gamename: this._name,
      gameAmount: this._gameunit.amount,
      gameUnit:
        this._gameunit.unit === UnitType.None
          ? ''
          : this._gameunit.unit
    };
  }
}