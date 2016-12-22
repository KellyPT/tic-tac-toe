import Backbone from 'backbone';
import $ from 'jquery';
import Game from 'app/models/game';
import BoardView from 'app/views/board_view';


const GameView = Backbone.View.extend({
  initialize: function() {
    //this.model = gameCollection made in app.js
    $('#game-board').hide();
    $('#all-game-info').empty();
  },

  events: {
    'click #new-game-button': 'createNewGame',
    'click #show-games-button': 'showAllGames'
  },

  createNewGame: function() {
    $('#game-board').show();
    $('#all-game-info').hide();
    // console.log("Created a new game");
    this.currentGame = new Game();
    // console.log(this.model.board.state);
    this.createNewBoard(this.currentGame, this.model);

  },

  createNewBoard: function(mod, coll) {
    this.boardView = new BoardView({
      el: $('#game-board'),
      model: mod,
      collection: coll
    });

    $('td').each(function() {
      $(this).empty();
    });
  },

  showAllGames: function() {
    $('#all-game-info').show();
    $('#all-game-info').empty();
    this.model.fetch().done(function(APIdata) {
      APIdata.forEach(function(eachGame) {
        console.log(eachGame);
        $('#all-game-info').append("ID: " + eachGame.id);
        $('#all-game-info').append("Players: " + eachGame.players);
        $('#all-game-info').append("Winner: " + eachGame.outcome);
      });
    });
  },

  render: function() {

  }
});

export default GameView;
