export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },
 
  preloader: {
    bgColor: "",
    image: "phaser",
    imageX: 512,
    imageY: 300,
    loadingText: "",
  },
  spritesheets:  [
    {
    name: "player",
    path: "assets/images/player.png",
    width: 454, 
    height: 669,
    frames: 3
    },{
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },{
      name: "tilemap-mappa2",
      path: "assets/map/tilemap-mappa2.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    }
    
  ]
,
  images: [
    {name:"logo-game", path:"assets/images/GameTitle.png"},
    {name:"log", path:"assets/images/log.png"},
    {name: "principale", path: "assets/images/MENUPRINCIPALE.png" },
    { name: "base", path: "assets/images/base.png" },
    { name: "continua", path: "assets/images/contiuna.png" },
    { name: "esci", path: "assets/images/esci.png" },
    { name: "x", path: "assets/images/x.png" },

  ],
  atlas: [],
  sounds: [{
    name: "music0",
    paths: ["assets/sounds/music0.mp3"],
    },
    {
    name: "jump",
    paths: ["assets/sounds/jump.mp3"],
    }
  ],
  audio: [],
  bitmapfont: [],
  tilemaps: [
		{
		key: "level-1",
		path: "assets/map/level-1.json",
		},
    {
      key: "level-2",
      path: "assets/map/level-2.json",
    }
	],
};
