let mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
  name: String,
  created: { type: Date, default: Date.now },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  ],
  divisions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division'
    }
  ],
  voiceChats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VoiceChat'
    }
  ],
  chef: String
});

mongoose.model('Player', PlayerSchema);
