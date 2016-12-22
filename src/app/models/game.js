import Backbone from 'backbone';
import Player from 'app/models/player';
import Board from 'app/models/board';


const Game = Backbone.Model.extend({
  defaults: {
    board: null,
    players: null,
    outcome: null
  },

  initialize: function() {
    this.turnCounter = 0;
    this.playerOne = new Player({name: "Player X", mark: "X"});
    this.playerTwo = new Player({name: "Player O", mark: "O"});
    this.currentPlayer = this.playerOne;
    this.gameBoard = new Board();
    this.won = false;
    this.gameOutcome = null;
    console.log("Created a new game with players: " + this.playerOne.name + " & " + this.playerTwo.name + " & board: " + this.gameBoard.state);
  },

  togglePlayer: function() {
    if (this.currentPlayer == this.playerOne) {
      this.currentPlayer = this.playerTwo;
      this.turnCounter++;
    } else {
      this.currentPlayer = this.playerOne;
      this.turnCounter++;
    }
  }
});
export default Game;
