var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Player = mongoose.model('Player');
let Game = mongoose.model('Game');
let Division = mongoose.model('Division');
let VoiceChat = mongoose.model('VoiceChat');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.PLAYER_BACKEND_SECRET });

//route to fix heroku
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

router.get('/API/players/', function (req, res, next) {
  let query = Player.find().populate('games').populate('divisions').populate('voiceChats');
  query.exec(function (err, players) {
    if (err) {
      return next(err);
    }
    res.json(players);
  });
});

router.post('/API/players/', auth, function (req, res, next) {
  Game.create(req.body.games, function (err, games) {
    Division.create(req.body.divisions, function (err, divs) {
      VoiceChat.create(req.body.voiceChats, function (err, vcs) {
        let player = new Player({ name: req.body.name, created: req.body.created });
        player.games = games;
        player.divisions = divs;
        player.voiceChats = vcs;
        player.chef = req.user.username;
        console.log(player);
        player.save(function (err, rec) {
          if (err) {
            Game.remove({ _id: { $in: player.games } });
            Division.remove({ _id: { $in: player.divisions } });
            VoiceChat.remove({ _id: { $in: player.voiceChats } });
            return next(err);
          }
          res.json(rec);
        });
      });
    });
  });
});

router.param('player', function (req, res, next, id) {
  let query = Player.findById(id).populate('games').populate('divisions').populate('voiceChats');
  query.exec(function (err, player) {
    if (err) {
      return next(err);
    }
    if (!player) {
      return next(new Error('not found ' + id));
    }
    req.player = player;
    return next();
  });
});

router.get('/API/player/:player', function (req, res, next) {
  res.json(req.player);
});

router.delete('/API/player/:player', auth, function (req, res) {
  Game.remove({ _id: { $in: req.player.games } }, function (err) {
    if (err) return next(err);
    req.player.remove(function (err) {
      if (err) {
        return next(err);
      }
    });
  });

  Division.remove({ _id: { $in: req.player.divisions } }, function (err) {
    if (err) return next(err);
    req.player.remove(function (err) {
      if (err) {
        return next(err);
      }
    });
  });

  VoiceChat.remove({ _id: { $in: req.player.voiceChats } }, function (err) {
    if (err) return next(err);
    req.player.remove(function (err) {
      if (err) {
        return next(err);
      }
    });
  });
  res.json(req.player);
});

router.post('/API/player/:player/games', auth, function (req, res, next) {
  let game = new Game(req.body);

  game.save(function (err, game) {
    if (err) return next(err);

    req.player.games.push(game);
    req.player.save(function (err, rec) {
      if (err) return next(err);
      res.json(game);
    });
  });
});

router.post('/API/player/:player/divisions', auth, function (req, res, next) {
  let div = new Division(req.body);

  div.save(function (err, division) {
    if (err) return next(err);

    req.player.divisions.push(division);
    req.player.save(function (err, rec) {
      if (err) return next(err);
      res.json(division);
    });
  });
});

router.post('/API/player/:player/voiceChats', auth, function (req, res, next) {
  let vc = new VoiceChat(req.body);

  vc.save(function (err, voiceChat) {
    if (err) return next(err);

    req.player.voiceChats.push(voiceChat);
    req.player.save(function (err, rec) {
      if (err) return next(err);
      res.json(voiceChat);
    });
  });
});

router.post('/API/reset_db', auth, (req, res, next) => {
  Player.find({}, (err, players) => {
    players.forEach(player => player.remove());
  });
  User.find({}, (err, users) => {
    users.forEach(user => user.remove());
  });
  res.status(204).end();
});

module.exports = router;