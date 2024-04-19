import Phaser from 'phaser';

export default class PortaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PortaScene' });
    }

    preload() {
        this.load.video('introVideo', 'assets/images/introVideo.mp4', 'canPlayType');
    } 

    create() {
        console.log("Porta Scene : create");
        const video = this.add.video(500, 300, 'introVideo');
        video.play();

        this.time.delayedCall(1500, () => {
            this.scene.start('Level1');
        });
    }
}
