import Phaser from 'phaser';

export default class TunnelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TunnelScene' });
    }

    preload() {
        this.load.video('introVideo', 'assets/images/introVideo.mp4', 'canPlayType');
    }

    create() {
        console.log("Porta Tunnel : create");
        const video = this.add.video(500, 300, 'introVideo');
        video.play();
 
        // Passa alla scena del livello 2 dopo un secondo
        this.time.delayedCall(1500, () => {
            this.scene.start('Level2');
        });
    }
}
