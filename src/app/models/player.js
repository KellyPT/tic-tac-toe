import Backbone from 'backbone';

const Player = Backbone.Model.extend({
  defaults: {
    name: null,
    mark: null
  },
});

export default Player;
