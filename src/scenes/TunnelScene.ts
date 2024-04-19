import Phaser from 'phaser';

export default class TunnelScene extends Phaser.Scene {
    public static music: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: 'TunnelScene' });
    }

    preload() {
        this.load.video('TunnelScene', 'assets/images/TunnelScene.mp4', 'canPlayType');
        TunnelScene.music = this.sound.add("walk", { loop: true, volume: 0.8 });
        TunnelScene.music.play();
    }

    create() {
        console.log("Porta Tunnel : create");
        const video = this.add.video(500, 300, 'TunnelScene');
        video.play();
 
        // Passa alla scena del livello 2 dopo un secondo
        this.time.delayedCall(5000, () => {
            TunnelScene.music.stop();

            this.scene.start('Level2');
        });
    }
}
