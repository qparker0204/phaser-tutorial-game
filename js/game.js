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
  Game.playerMap = {};
  var map = game.add.tilemap('map');
  //tilesheet is the key of the tileset in map's JSON file
  map.addTilesetImage('tilesheet', 'tileset');
  var layer;
  for(var i = 0; i < map.layers.length; i++) {
    layer = map.createLayer(i);
  }
  //Allows clicking on the map
  layer.inputEnabled = true;
  Client.askNewPlayer();
  layer.events.onInputUp.add(Game.getCoordinates, this);
};

//add player to map
Game.addNewPlayer = function(id,x,y) {
    Game.playerMap[id] = game.add.sprite(x, y, 'sprite');
};

Game.removePlayer = function(id) {
  Game.playerMap[id].destroy();
  delete Game.playerMap[id];
};

Game.getCoordinates = function(layer, pointer) {
  Client.sendClick(pointer.worldX, pointer.worldY);
};

Game.movePlayer = function(id, x, y) {
  var player = Game.playerMap[id];
  var distance = Phaser.Math.distance(player.x, player.y, x, y);
  var duration = distance * 10;
  var tween = game.add.tween(player);
  tween.to({x:x, y:y}, duration);
  tween.start();
};
