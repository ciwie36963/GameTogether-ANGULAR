let mongoose = require('mongoose');

let VoiceChatSchema = new mongoose.Schema({
    voiceChatname: String,
    vcAmount: {type: Number, default: 0},
    vcUnit: String
});

VoiceChatSchema.pre('remove', function (next) {
    this.model('Player').update(
        {}, 
      { $pull: { voiceChats: this._id } }, 
      { safe: true, multi: true }, 
      next
    );
  })
  
  mongoose.model('VoiceChat', VoiceChatSchema);
  