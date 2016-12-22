import GameView from 'app/views/game_view';
import GameCollection from 'app/collections/game_collection';
import $ from 'jquery';

$(document).ready(function() {
  console.log("******PLAYING!!*****");

  var gameCollection = new GameCollection();

  var options = {
    el: $('body'),
    model: gameCollection
  };

  var currentGame = new GameView(options);
  currentGame.render();
});
