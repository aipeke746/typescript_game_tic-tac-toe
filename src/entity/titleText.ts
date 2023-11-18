export class TitleText {
    private FONT_SIZE: number = 32;
    private CONTENT: string = 'TITLE PAGE';

    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, ) {
        this.text = scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height/2, this.CONTENT)
            .setOrigin(0.5)
            .setFontSize(this.FONT_SIZE)
            .setVisible(false)
            .setInteractive()
            .on('pointerdown', () => {
                scene.cameras.main.fadeOut(500, 255, 255, 255);
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    scene.scene.start('titleScene');
                });
            });
    }

    public setVisible(visible: boolean) {
        this.text.setVisible(visible);
    }
}