import { Component, OnInit, Input } from '@angular/core';
import { VoiceChat } from './voice-chat.model';

@Component({
  selector: 'app-voice-chat',
  templateUrl: './voice-chat.component.html',
  styleUrls: ['./voice-chat.component.css']
})
export class VoiceChatComponent implements OnInit {
  @Input() public voiceChat : VoiceChat;
  
  constructor() { }

  ngOnInit() {
  }

}
