var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

//preload assets before game start
Game.preload = function() {
    game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    //this will be the sprite of the players
    game.load.image('sprite','assets/sprites/sprite.png');
};

//create game
Game.create = function() {
  var map = game.add.tilemap('map');
  //tilesheet is the key of the tileset in map's JSON file
  map.addTilesetImage('tilesheet', 'tileset');
  var layer;
  for(var i = 0; i < map.layers.length; i++) {
    layer = map.createLayer(i);
  }
  //Allows clicking on the map
  layer.inputEnabled = true;
};
