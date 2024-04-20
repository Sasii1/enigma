import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.video('GameOver', 'assets/images/gameover.mp4', 'canPlayType');
    }

    create() {
        console.log("Bigdoor : create");
        const video = this.add.video(500, 300, 'GameOver');
        video.play();
 
        this.time.delayedCall(5000, () => {
            window.location.reload();
            });
    }
}
