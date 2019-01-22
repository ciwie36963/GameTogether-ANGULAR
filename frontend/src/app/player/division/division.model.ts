export enum UnitType {
  Unranked,
  Bronze,
  Silver,
  Gold,
  Platinum,
  Diamond,
  Master,
  Challenger
}
export class DivisionUnit {
  constructor(private _amount: number, private _unit: UnitType) {}
  get amount(): number {
    return this._amount;
  }
  get unit(): UnitType {
    return this._unit;
  }
}
export class Division {
  private _id: string;
  private _name: string;
  private _divisionunit: DivisionUnit;

  static fromJSON(json): Division {
    const rec = new Division(json.divisionname, json.divAmount, json.divUnit);
    rec._id = json._id;
    return rec;
  }

  constructor(
    divisionname: string,
    divAmount: number = 1,
    divUnit: UnitType = UnitType.Unranked
  ) {
    this._name = divisionname;
    this._divisionunit = new DivisionUnit(divAmount, divUnit);
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
    return this._divisionunit.amount;
  }
  get unit(): UnitType {
    return this._divisionunit.unit;
  }

  toJSON() {
    return {
      _id: this._id,
      divisionname: this._name,
      divAmount: this._divisionunit.amount,
      divUnit:
        this._divisionunit.unit === UnitType.Unranked
          ? ''
          : this._divisionunit.unit
    };
  }
}