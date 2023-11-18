import { Coordinate } from "../entity/coordinate";
import { TitleText } from "../entity/titleText";
import { Tilemap } from "../map/tilemap";
import { MarkType } from "../type/markType";
import { GameManager } from "../manager/gameManager";

/**
 * ゲーム対戦に関するサービス
 */
export class BattleService {
    /**
     * ゲームの流れを管理
     * @param gameManager ゲームマネージャー
     * @param tilemap タイルマップ
     * @param coordinate タイルマップの座標
     */
    public static gameFlow(gameManager: GameManager, tilemap: Tilemap, coordinate: Coordinate): void {
        gameManager.isSenkoTurn()
            ? tilemap.field.update(coordinate, MarkType.Maru)
            : tilemap.field.update(coordinate, MarkType.Batsu);
        
        gameManager.nextTurn();
        tilemap.updateTile(tilemap.field.getMarkType(coordinate), coordinate);
    }

    /**
     * ゲームの判定（未決、勝敗、引き分け）
     * @param gameManager ゲームマネージャー
     * @param tilemap タイルマップ
     * @param titleText タイトルテキスト
     */
    public static gameJudge(gameManager: GameManager, tilemap: Tilemap, titleText: TitleText): void {
        const winner = tilemap.field.getLine();
        if (winner !== MarkType.None) {
            gameManager.setWinner(winner);
            titleText.setVisible(true);
        }
        if (tilemap.field.isFull()) {
            titleText.setVisible(true);
        }
    }

    /**
     * ゲームの勝者を表示する
     * @param scene シーン
     * @param gameManager ゲームマネージャー
     */
    public static showWinner(scene: Phaser.Scene, gameManager: GameManager): void {
        const winner = gameManager.getWinner() === MarkType.Maru ? '⚪︎' : '×';
        scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height - 50, 'WINNER: ' + winner)
            .setOrigin(0.5)
            .setFontSize(32);
    }
}