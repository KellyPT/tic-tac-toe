import Backbone from 'backbone';
import $ from 'jquery';

const BoardView = Backbone.View.extend({
  initialize: function() {
    console.log("Made a BoardView!!!");
    //this.collection = the collection we wnat to save to
  },

  events: {
    'click .square': 'setMarker'
  },

  setMarker: function(e) {
    var winner = null;
    var space = e.target;
    var eRow = e.currentTarget.attributes.row.value;
    var eColumn = e.currentTarget.attributes.col.value;

    if (!this.model.won && this.model.gameBoard.isAvailable(eRow, eColumn) && this.model.turnCounter < 9) {
      this.model.gameBoard.makeMove(eRow, eColumn, this.model.currentPlayer.get('mark'));
      $(space).html(this.model.currentPlayer.get('mark'));

      //check win
      if (this.model.gameBoard.checkWin()) {
        winner = this.model.currentPlayer;
        this.model.won = true;
        alert(winner.get('name') + " wins!!!!!");
        this.model.gameOutcome = winner.get('mark');
        console.log("OUTCOME IS: " + this.model.gameOutcome);

        var rawGame = {
          board: [].concat.apply([], this.model.gameBoard.state),
          players: [this.model.playerOne.get('name'), this.model.playerTwo.get('name')],
          outcome: this.model.gameOutcome
        };

        this.collection.create(rawGame);
      }
      //change the player and increment turn counter
      this.model.togglePlayer();

      //if board is full and no one has won, call stalemate
      if (this.model.turnCounter == 9 && !this.model.won) {
        alert("STALEMATE!");
        this.model.gameOutcome = "draw";
        console.log("OUTCOME IS: " + this.model.gameOutcome);

        var rawGameDraw = {
          board: [].concat.apply([], this.model.gameBoard.state),
          players: [this.model.playerOne.get('name'), this.model.playerTwo.get('name')],
          outcome: this.model.gameOutcome
        };

        this.collection.create(rawGameDraw);
      }

    }

    console.log(this.model.gameBoard.state);
  },

  render: function() {

  }
});

export default BoardView;
