import Player from "../components/Player";
import End from "./End";

export default class Level3 extends Phaser.Scene { 
    private mainCam: Phaser.Cameras.Scene2D.Camera;
    private player: Player;
    private log :Phaser.GameObjects.Image;
    public static music: Phaser.Sound.BaseSound;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private layer2: Phaser.Tilemaps.TilemapLayer;
    private layerEnd: Phaser.Tilemaps.TilemapLayer;
    static isCompleted: boolean;
    private bg:Phaser.GameObjects.Image;

    constructor() {
        super({
            key: "Level3",
        });
    }

    preload() {
        this.scene.add("End",End);
        this.scene.setVisible(true, "End");
        this.player = new Player({ scene: this, x: 105, y: 500, key: "player" });
        this.physics.add.existing(this.player);
        Level3.music = this.sound.add("music2", { loop: true, volume: 1 });
        Level3.music.play();
        this.map = this.make.tilemap({ key: "level-3" });
        this.bg=this.add.image(0, 0,"bg").setOrigin(0,0).setDepth(2);
        this.mainCam = this.cameras.main;
        this.mainCam.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.mainCam.startFollow(this.player);
        this.physics.world.setBounds(0, 0,this.map.widthInPixels,this.map.heightInPixels);
        this.tileset = this.map.addTilesetImage("tilemap-mappa3");
        this.layer = this.map
            .createLayer("world", this.tileset, 0, 0)
            .setDepth(3)
            .setAlpha(1);
        this.layer2 = this.map
            .createLayer("collisions", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layerEnd = this.map.createLayer("end", this.tileset, 0, 0).setDepth(4).setAlpha(1);
        this.layer2.setCollisionByProperty({ collide: true });
        this.layerEnd.setCollisionByProperty({ collide: true });

        this.createCollider();
         
    }
    create(){
        console.log("create:Level3");
        this.add.image(1024, 0, "log").setOrigin(1, 0).setDepth(14).setScale(0.3).setAlpha(1).setScrollFactor(0);
    }
    createCollider() {
        this.physics.add.collider(this.player, this.layer2, (_player: any, _tile: any) => {

        }, undefined, this);
        
        this.physics.add.collider(this.player, this.layerEnd, (_player: any, _tile: any) => {
            console.log("hitted end");
            Level3.isCompleted= true;
        }, undefined, this);
    }

    update(time: number, delta: number): void {
        this.player.update(time, delta);

        if(Level3.isCompleted){
            console.log("o fratm")
            Level3.music.stop();
            this.scene.stop("Level3");
            this.scene.start("End");  
            }
    }
}