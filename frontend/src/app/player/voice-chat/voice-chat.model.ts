export enum UnitType {
  None,
  TeamSpeak,
  Discord,
  Ventrillo,
  Skype,
  FbMessenger
}
export class VoiceChatUnit {
  constructor(private _amount: number, private _unit: UnitType) {}
  get amount(): number {
    return this._amount;
  }
  get unit(): UnitType {
    return this._unit;
  }
}
export class VoiceChat {
  private _id: string;
  private _name: string;
  private _voiceChatunit: VoiceChatUnit;

  static fromJSON(json): VoiceChat {
    const rec = new VoiceChat(json.voiceChatname, json.vcAmount, json.vcUnit);
    rec._id = json._id;
    return rec;
  }

  constructor(
    voiceChatname: string,
    vcAmount: number = 1,
    vcUnit: UnitType = UnitType.None
  ) {
    this._name = voiceChatname;
    this._voiceChatunit = new VoiceChatUnit(vcAmount, vcUnit);
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
    return this._voiceChatunit.amount;
  }
  get unit(): UnitType {
    return this._voiceChatunit.unit;
  }

  toJSON() {
    return {
      _id: this._id,
      voiceChatname: this._name,
      vcAmount: this._voiceChatunit.amount,
      vcUnit:
        this._voiceChatunit.unit === UnitType.None
          ? ''
          : this._voiceChatunit.unit
    };
  }
}