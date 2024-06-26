import Player from "../components/Player";
import PauseHud from "./PauseHud";
import Level2 from "./Level2";
import Legenda from "./Legenda";
import Tunnel from "./TunnelScene";
import Overlay from "./Overlay";
import GameOver from "./GameOver";

export default class Level1 extends Phaser.Scene {
    private mainCam: Phaser.Cameras.Scene2D.Camera;
    private player: Player;
    public static music: Phaser.Sound.BaseSound;
    public static completed: boolean;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private layer2: Phaser.Tilemaps.TilemapLayer;
    private layerEnd: Phaser.Tilemaps.TilemapLayer;
    private keyEsc: any;
    private keyI: any;
    private keyK: any;
    private isLegendaOpen: boolean;
    private isIKeyDown: boolean = false;

    constructor() {
        super({
            key: "Level1",
        });
    }

    preload() {
        PauseHud.setLevel(1);
        this.scene.setVisible(true, "Level1");
        this.scene.setVisible(true, "Level2");
        this.scene.setVisible(true, "Legenda");
        this.scene.setVisible(true, "TunnelScene");
        this.scene.setVisible(true, "Overlay");
        this.scene.add("Overlay", Overlay);
        this.scene.setVisible(true, "GameOver");
        this.scene.add("GameOver", GameOver);
        this.scene.add("Level2", Level2);
        this.scene.add("Legenda", Legenda);
        this.scene.add("TunnelScene", Tunnel);
        this.player = new Player({ scene: this, x: 55, y: 55, key: "player" });
        this.physics.add.existing(this.player);
        Level1.music = this.sound.add("music0", { loop: true, volume: 1 });
        Level1.music.play();
        this.map = this.make.tilemap({ key: "level-1" });
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.isLegendaOpen = false;
        this.mainCam = this.cameras.main;

        this.mainCam.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );
        this.mainCam.startFollow(this.player);
        this.physics.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );

        this.tileset = this.map.addTilesetImage("tilemap-extruded");
        this.layer = this.map
            .createLayer("world", this.tileset, 0, 0)
            .setDepth(3)
            .setAlpha(1);
        this.layer2 = this.map
            .createLayer("collisions", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layerEnd = this.map
            .createLayer("end", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layer2.setCollisionByProperty({ collide: true });
        this.layerEnd.setCollisionByProperty({ collide: true });
        this.createCollider();


        this.scene.launch("Overlay");
    }

    create() {
        console.log("create:Level1");
        this.add.image(1024, 0, "log").setOrigin(1, 0).setDepth(14).setScale(0.3).setAlpha(1).setScrollFactor(0);
    }

    createCollider() {
        this.physics.add.collider(this.player, this.layer2, (_player: any, _tile: any) => {
        }, undefined, this);

        this.physics.add.collider(this.player, this.layerEnd, (_player: any, _tile: any) => {
            console.log("hitted end");
            Level1.completed = true;
        }, undefined, this);
    }

    update(time: number, delta: number): void {

        if(this.keyK.isDown){
            this.scene.remove("Level1");
            this.scene.remove("Overlay");
            this.scene.remove("Legenda");
            this.scene.remove("TunnelScene");
            this.scene.start("GameOver");
        }
        if (Level1.completed) {
            Level1.completed= false;
            Level1.music.stop();
            this.scene.remove("Overlay");
            this.scene.remove("GameOver");
            this.scene.remove("Legenda");
           
            this.scene.start('TunnelScene');
        }

        this.player.update(time, delta);

        if (this.keyEsc.isDown) {
            this.player.pause = true;
            Level1.music.stop()
            this.scene.launch("PauseHud");
            this.scene.pause();
            this.time.addEvent({
                delay: 100, loop: false, callback: () => {
                    this.player.pause = false;
                }, callbackScope: this
            });
        }
 

if (this.keyI.isDown && !this.isIKeyDown && !this.isLegendaOpen) {
    this.isIKeyDown = true;
    this.scene.launch("Legenda");
    this.isLegendaOpen = true;

    this.time.addEvent({
        delay: 300,
        loop: false,
        callback: () => {
            this.isIKeyDown = false;
        },
        callbackScope: this
    });
} else if (this.keyI.isDown && !this.isIKeyDown && this.isLegendaOpen) {
    this.isIKeyDown = true;
    this.scene.stop("Legenda");
    this.isLegendaOpen = false;

    this.time.addEvent({
        delay: 300,
        loop: false,
        callback: () => {
            this.isIKeyDown = false;
        },
        callbackScope: this
    });
} else if (!this.keyI.isDown) {
    this.isIKeyDown = false;
}

        
        
        
    }
}
