export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: true,
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
    width: 52, 
    height: 67,
    frames: 12
    },{
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
    {
      name: "tilemap-mappa2",
      path: "assets/map/tilemap-mappa2.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
    {
      name: "tilemap-mappa3",
      path: "assets/map/tilemap-mappa3.png",
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
    { name: "1", path: "assets/images/1.png" },
    { name: "x", path: "assets/images/x.png" },
    { name: "legenda", path: "assets/images/legenda.png" },
    { name: "bg", path: "assets/images/bg.png" },

  ],
  atlas: [],
  sounds: [{
    name: "music0",
    paths: ["assets/sounds/music0.mp3"],
    },
    {
      name: "music1",
      paths: ["assets/sounds/music1.mp3"],
    },
    {
    name: "jump",
    paths: ["assets/sounds/jump.mp3"],
    },
    {
    name: "walk",
    paths: ["assets/sounds/walk.mp3"],
    },
    {
    name: "introMusic",
    paths: ["assets/sounds/introMusic.mp3"],
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
    },
    {
      key: "level-3",
      path: "assets/map/level-3.json",
    }
	],
};
