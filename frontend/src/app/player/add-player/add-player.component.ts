import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../player.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { Game, UnitType } from '../game/game.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PlayerDataService } from '../player-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Division } from '../division/division.model';
import { VoiceChat } from '../voice-chat/voice-chat.model';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  public readonly gameUnitTypes = ['', 'Battlefield', 'Dota', 'League_Of_Legends','Rocket_League'];
  public readonly divisionUnitTypes = ['Unranked', 'Bronze', 'Silver', 'Gold','Platinum', 'Diamond', 'Master', 'Challenger'];
  public readonly voiceChatUnitTypes = ['','TeamSpeak', 'Discord', 'Ventrillo', 'Skype','FbMessenger'];
  public player: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private _playerDataService: PlayerDataService
  ) {}

  get games(): FormArray {
    return <FormArray>this.player.get('games');
  }
  get divisions(): FormArray {
    return <FormArray>this.player.get('divisions');
  }
  get voiceChats(): FormArray {
    return <FormArray>this.player.get('voiceChats');
  }

  ngOnInit() {
    this.player = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      games: this.fb.array([this.createGames()]),
      divisions: this.fb.array([this.createDivisions()]),
      voiceChats: this.fb.array([this.createVoiceChats()])
    });

    this.games.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(ingList => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = ingList[ingList.length - 1];
        if (
          lastElement.gamename &&
          lastElement.gamename.length > 2
        ) {
          this.games.push(this.createGames());
        } else if (ingList.length >= 2) {
          const secondToLast = ingList[ingList.length - 2];
          if (
            !lastElement.gamename &&
            !lastElement.gameAmount &&
            !lastElement.gameUnit &&
            (!secondToLast.gamename ||
              secondToLast.gamename.length < 2)
          ) {
            this.games.removeAt(this.games.length - 1);
          }
        }
      });

      this.divisions.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(divList => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = divList[divList.length - 1];
        if (
          lastElement.divisionname &&
          lastElement.divisionname.length > 2
        ) {
          this.divisions.push(this.createDivisions());
        } else if (divList.length >= 2) {
          const secondToLast = divList[divList.length - 2];
          if (
            !lastElement.divisionname &&
            !lastElement.divAmount &&
            !lastElement.divUnit &&
            (!secondToLast.divisionname ||
              secondToLast.divisionname.length < 2)
          ) {
            this.divisions.removeAt(this.divisions.length - 1);
          }
        }
      });

      this.voiceChats.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(vcList => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = vcList[vcList.length - 1];
        if (
          lastElement.voiceChatname &&
          lastElement.voiceChatname.length > 2
        ) {
          this.voiceChats.push(this.createVoiceChats());
        } else if (vcList.length >= 2) {
          const secondToLast = vcList[vcList.length - 2];
          if (
            !lastElement.voiceChatname &&
            !lastElement.vcAmount &&
            !lastElement.vcUnit &&
            (!secondToLast.voiceChatname ||
              secondToLast.voiceChatname.length < 2)
          ) {
            this.voiceChats.removeAt(this.voiceChats.length - 1);
          }
        }
      });
  }

  createGames(): FormGroup {
    return this.fb.group({
      gameAmount: [''],
      gameUnit: [''],
      gamename: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  createDivisions(): FormGroup {
    return this.fb.group({
      divAmount: [''],
      divUnit: [''],
      divisionname: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  createVoiceChats(): FormGroup {
    return this.fb.group({
      vcAmount: [''],
      vcUnit: [''],
      voiceChatname: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    const player = new Player(this.player.value.name);

    for (const pla of this.player.value.games) {
      if (pla.gamename.length > 2) {
        const game = new Game(
          pla.gamename,
          pla.gameAmount,
          pla.gameUnit
        );
        player.addGame(game);
      }
    }
    for (const div of this.player.value.divisions) {
      if (div.divisionname.length > 2) {
        const division = new Division(
          div.divisionname,
          div.divAmount,
          div.divUnit
        );
        player.addDivision(division);
      }
    }
    for (const vc of this.player.value.voiceChats) {
      if (vc.voiceChatname.length > 2) {
        const voiceChat = new VoiceChat(
          vc.voiceChatname,
          vc.vcAmount,
          vc.vcUnit
        );
        player.addVoiceChat(voiceChat);
      }
    }
    this._playerDataService.addNewPlayer(player).subscribe(
      () => {
        this.player.reset();
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding player for ${
          player.name
        }: ${error.error}`;
      }
    );
  }
}
