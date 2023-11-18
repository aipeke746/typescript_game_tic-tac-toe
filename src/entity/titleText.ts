/**
 * タイトル画面に遷移するテキスト
 */
export class TitleText {
    /**
     * フォントサイズ
     */
    private FONT_SIZE: number = 32;
    /**
     * 文字の内容
     */
    private CONTENT: string = 'TITLE PAGE';
    /**
     * Phaserのテキストオブジェクト
     */
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

    /**
     * タイトル画面に遷移する文字を表示するかどうかを設定する
     * @param visible 表示するかどうか
     */
    public setVisible(visible: boolean): void {
        this.text.setVisible(visible);
    }
}