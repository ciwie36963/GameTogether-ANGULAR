let mongoose = require('mongoose');

let GameSchema = new mongoose.Schema({
    gamename: String,
    gameAmount: {type: Number, default: 0},
    gameUnit: String
});

GameSchema.pre('remove', function (next) {
    this.model('Player').update(
        {}, 
      { $pull: { games: this._id } }, 
      { safe: true, multi: true }, 
      next
    );
  })
  
  mongoose.model('Game', GameSchema);
  