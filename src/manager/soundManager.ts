export class SoundManager {
    private winSound: Phaser.Sound.BaseSound;
    private loseSound: Phaser.Sound.BaseSound;
    private setMarkSound: Phaser.Sound.BaseSound;
    private notSetMarkSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene) {
        this.winSound = scene.sound.add('winSound');
        this.loseSound = scene.sound.add('loseSound');
        this.setMarkSound = scene.sound.add('setMarkSound');
        this.notSetMarkSound = scene.sound.add('notSetMarkSound');
    }

    public playWinSound(): void {
        this.winSound.play();
    }

    public playLoseSound(): void {
        this.loseSound.play();
    }

    public playSetMarkSound(): void {
        this.setMarkSound.play();
    }

    public playNotSetMarkSound(): void {
        this.notSetMarkSound.play();
    }
}