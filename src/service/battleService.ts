import { Coordinate } from "../entity/coordinate";
import { TitleText } from "../entity/titleText";
import { Player } from "../entity/player";
import { Tilemap } from "../map/tilemap";
import { MarkType } from "../type/markType";
import { GameManager } from "../manager/gameManager";
import { SoundManager } from "../manager/soundManager";
import { ComputerService } from "./computer/computerService";
import { CoordinateFactory } from "../factory/coordinateFactory";

/**
 * ゲーム対戦に関するサービス
 */
export class BattleService {

    /**
     * 現在のターンがプレイヤーターンかどうかを返す
     * @param gameManager ゲームマネージャー
     * @param player プレイヤー
     * @returns プレイヤーターンかどうかを返す
     */
    public static isPlayerTurn(gameManager: GameManager, player: Player): boolean {
        const playerMark: MarkType = player.getMyMark();
        return playerMark === gameManager.getMarkByCurrentTurn();
    }

    /**
     * プレイヤーターンの処理
     * @param gameManager ゲームマネージャー
     * @param tilemap タイルマップ
     */
    public static playerTurn(gameManager: GameManager, tilemap: Tilemap, soundManager: SoundManager): void {
        if (gameManager.isMouseDown()) {
            // クリックした時の処理
            gameManager.reverseIsDown();
            const coordinate: Coordinate = CoordinateFactory.createByMousePos(gameManager.getMousePos());
            if (!this.canPutMark(coordinate, tilemap)) {
                soundManager.playNotSetMarkSound();
                return;
            }

            soundManager.playSetMarkSound();
            this.gameFlow(gameManager, tilemap, coordinate);
        } else if (gameManager.isMouseUp()) {
            // クリックを離した時の処理
            gameManager.reverseIsDown();
        }
    }

    /**
     * コンピュータターンの処理
     * @param computer コンピューターの処理方法
     * @param gameManager ゲームマネージャー
     * @param tilemap タイルマップ
     */
    public static computerTurn(gameManager: GameManager, tilemap: Tilemap, player: Player, computer: ComputerService): void {
        const coordinate: Coordinate = computer.getCoordinate(tilemap, player);
        if (!this.canPutMark(coordinate, tilemap)) return;

        this.gameFlow(gameManager, tilemap, coordinate);
    }

    /**
     * ゲームの終了判定
     * @param tilemap タイルマップ
     * @returns ゲームの決着（勝敗、引き分け）がついた場合はtrue
     */
    public static finishGame(tilemap: Tilemap): boolean {
        if (tilemap.field.getLine() !== MarkType.None) {
            return true;
        }
        if (tilemap.field.isFull()) {
            return true;
        }
        return false;
    }

    /**
     * ゲームの勝者を表示する
     * @param scene シーン
     * @param gameManager ゲームマネージャー
     */
    public static showWinner(scene: Phaser.Scene, tilemap: Tilemap, player: Player, titleText: TitleText): void {
        const winnerMark: MarkType = tilemap.field.getLine();
        let winner = winnerMark === player.getMyMark()
            ? 'You WIN' : 'You LOSE';
        if (winnerMark === MarkType.None) {
            winner = 'DRAW';
        }

        scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height - 50, winner)
            .setOrigin(0.5)
            .setFontSize(32);
        titleText.setVisible(true);
    }

    /**
     * マークをセットできるかどうかを返す
     * @param coordinate 座標
     * @param tilemap タイルマップ
     * @returns マークがセットできる場合はtrue
     */
    private static canPutMark(coordinate: Coordinate, tilemap: Tilemap): boolean {
        if (coordinate.isInvalid()) return false;
        if (tilemap.field.getMarkType(coordinate) !== MarkType.None) return false;
        return true;
    }

    /**
     * ゲームの流れを管理
     * @param gameManager ゲームマネージャー
     * @param tilemap タイルマップ
     * @param coordinate タイルマップの座標
     */
    private static gameFlow(gameManager: GameManager, tilemap: Tilemap, coordinate: Coordinate): void {
        gameManager.isSenkoTurn()
            ? tilemap.field.update(coordinate, MarkType.Maru)
            : tilemap.field.update(coordinate, MarkType.Batsu);

        gameManager.nextTurn();
        tilemap.updateTile(tilemap.field.getMarkType(coordinate), coordinate);
    }
}