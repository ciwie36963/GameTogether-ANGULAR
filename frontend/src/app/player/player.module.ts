import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { GameComponent } from "./game/game.component";
import { PlayerComponent } from "./player/player.component";
import { PlayerFilterPipe } from "./player-filter.pipe";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { PlayerListComponent } from "./player-list/player-list.component";
import { PlayerDataService } from "./player-data.service";
import { RouterModule } from "@angular/router";
import { PlayerDetailComponent } from "./player-detail/player-detail.component";
import { PlayerResolver } from "./player-resolver";
import { httpInterceptorProviders, basehttpInterceptorProviders } from "../http-interceptors";
import { VoiceChatComponent } from './voice-chat/voice-chat.component';
import { DivisionComponent } from './division/division.component';

const routes = [
  { path: 'list', component: PlayerListComponent },
  { path: 'add', component: AddPlayerComponent },
  { path: ':id', component: PlayerDetailComponent, resolve: { player: PlayerResolver } }
];
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlayerComponent,
    GameComponent,
    AddPlayerComponent,
    PlayerFilterPipe,
    PlayerListComponent,
    PlayerDetailComponent,
    VoiceChatComponent,
    DivisionComponent
  ],
  providers: [
    basehttpInterceptorProviders,
    httpInterceptorProviders,
    PlayerDataService,
    PlayerResolver
  ]
})
export class PlayerModule { }