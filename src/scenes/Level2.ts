import Player from "../components/Player";
import Bigdoor from "./Bigdoor";
import GameOver from "./GameOver";
import Level3 from "./Level3";
import PauseHud from "./PauseHud";
import Keypad from "./keypad";
export default class Level2 extends Phaser.Scene {
    private mainCam: Phaser.Cameras.Scene2D.Camera;
    private player: Player;
    private log :Phaser.GameObjects.Image;
    public static music: Phaser.Sound.BaseSound;
    public static completed: boolean;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private layer2: Phaser.Tilemaps.TilemapLayer;
    private layerEnd: Phaser.Tilemaps.TilemapLayer;
    private layerBack: Phaser.Tilemaps.TilemapLayer;
    private keyEsc: any;
    private keyI: any;
    private isLegendaOpen: boolean;
    private isIKeyDown: boolean = false;

    constructor() {
        super({
            key: "Level2",
        });
    }

    preload() {
        PauseHud.setLevel(2);
        this.scene.setVisible(true, "Keypad");
        this.scene.add("Keypad", Keypad);
        this.scene.setVisible(true, "GameOver");
        this.scene.add("GameOver", GameOver);
        this.scene.setVisible(true, "Level3");
        this.scene.add("Level3", Level3);
        this.scene.setVisible(true, "Legenda");
        this.scene.add("Bigdoor", Bigdoor);
        this.scene.setVisible(true, "Bigdoor");
        this.player = new Player({ scene: this, x: 150, y: 500, key: "player" });
        Level2.music = this.sound.add("music1", { loop: true, volume: 0.8 });
        Level2.music.play();
        this.physics.add.existing(this.player);
        this.map = this.make.tilemap({ key: "level-2" });
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
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

        this.tileset = this.map.addTilesetImage("tilemap-mappa2");
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
            this.layerBack = this.map
            .createLayer("back", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layer2.setCollisionByProperty({ collide: true });
        this.layerEnd.setCollisionByProperty({ collide: true });
        this.layerBack.setCollisionByProperty({ collide: true });

        this.createCollider();


        this.scene.launch("Overlay");
    }

    create() {
        console.log("create:Level2");
        this.add.image(1024, 0, "log").setOrigin(1, 0).setDepth(14).setScale(0.3).setAlpha(1).setScrollFactor(0);
        
    }

    createCollider() {

        this.physics.add.collider(this.player, this.layer2, (_player: any, _tile: any) => {
        }, undefined, this);

        this.physics.add.collider(this.player, this.layerEnd, (_player: any, _tile: any) => {
            console.log("hitted end");
            this.scene.launch('Keypad');
            Level2.completed= true;
            }, undefined, this);

        this.physics.add.collider(this.player, this.layerBack, (_player: any, _tile: any) => {
            console.log("hitted back");
            this.scene.remove("Level2");
            this.scene.remove("Keypad");
            this.scene.remove("Level3");
            this.scene.remove("Bigdoor");
            this.scene.remove("Legenda");
            this.scene.remove("TunnelScene");
            this.scene.remove('GameOver');

            Level2.music.stop();
            this.scene.launch("Level1");
            }, undefined, this);

        

    }
    tentativiKeypad: number = 3;
    update(time: number, delta: number): void {
        this.player.update(time, delta);
       
        const cameraWidth = 3 * this.player.width;
        const cameraHeight = 2 * this.player.height;

        const cameraX = Math.max(0, this.player.x - cameraWidth / 2); 
        const cameraY = Math.max(0, this.player.y - cameraHeight / 2);

        this.mainCam.setSize(cameraWidth, cameraHeight);
        this.mainCam.setPosition(cameraX, cameraY);

    
        if (Keypad.success) {
            Keypad.success = false;
            Keypad.isEnter = false;
            Keypad.inputTesto = '';
            this.player.setX(150);
            this.player.setY(550);
            this.scene.stop('Level2');
            this.scene.remove("Legenda");
            this.scene.stop('Keypad');
            this.scene.remove('GameOver');
            Level2.music.stop();
            Level2.completed = false;
            this.scene.run('Bigdoor');
        }else{
            if(Level2.completed && Keypad.inputTesto != "NEFERTITI" && Keypad.isEnter && this.tentativiKeypad > 0){
                this.player.setX(150);
                this.player.setY(550);
                this.scene.stop('Keypad');
                this.scene.stop("Legenda");
                Keypad.isEnter = false;
                Keypad.inputTesto = '';
                this.tentativiKeypad--
            }else{
                if(this.tentativiKeypad == 0){
                    this.scene.stop('Level2');
                    this.scene.launch('GameOver');
               }
            }
        } 


        if (this.keyEsc.isDown) {
            Level2.music.pause();
            this.player.pause = true;
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