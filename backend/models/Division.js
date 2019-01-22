let mongoose = require('mongoose');

let DivisionSchema = new mongoose.Schema({
    divisionname: String,
    divAmount: {type: Number, default: 0},
    divUnit: String
});

DivisionSchema.pre('remove', function (next) {
    this.model('Player').update(
        {}, 
      { $pull: { divisions: this._id } }, 
      { safe: true, multi: true }, 
      next
    );
  })
  
  mongoose.model('Division', DivisionSchema);
  