import { Coordinate } from "../entity/coordinate";
import { TitleText } from "../entity/titleText";
import { Player } from "../entity/player";
import { Tilemap } from "../map/tilemap";
import { GameManager } from "../manager/gameManager";
import { MarkType } from "../type/markType";
import { BattleService } from "../service/battleService";
import { ComputerService } from "../service/computer/computerService";
import { ComputerServiceImpl } from "../service/computer/impl/randomImpl";
import { CoordinateFactory } from "../factory/coordinateFactory";

/**
 * ゲームプレイ画面
 */
export class GameScene extends Phaser.Scene {
    private gameManager?: GameManager;
    private tilemap?: Tilemap;
    private titleText?: TitleText
    private player?: Player;
    private computer?: ComputerService;

    constructor() {
        super({ key: 'gameScene' });
    }
    
    preload() {
        this.load.image('mapTiles', 'assets/images/maru_batsu.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 255, 255, 255);
        this.gameManager = new GameManager(this);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.titleText = new TitleText(this);
        this.player = new Player(true);
        this.computer = new ComputerServiceImpl();
    }

    update() {
        if (!this.player || !this.computer || !this.gameManager || !this.tilemap || !this.titleText) return;

        // 勝者が決まった場合
        if (this.gameManager.getWinner() !== MarkType.None) {
            BattleService.showWinner(this, this.gameManager);
            return;
        }

        // ゲームプレイ中
        if (BattleService.isPlayerTurn(this.gameManager, this.player)) {
            // プレイヤーターン
            if (this.gameManager.isMouseDown()) {
                this.gameManager.reverseIsDown();
                
                const coordinate: Coordinate = CoordinateFactory.createByMousePos(this.gameManager.getMousePos());
                if (coordinate.isInvalid()) return;
                if (this.tilemap.field.getMarkType(coordinate) !== MarkType.None) return;

                BattleService.gameFlow(this.gameManager, this.tilemap, coordinate);
                BattleService.gameJudge(this.gameManager, this.tilemap, this.titleText);
            } else if (this.gameManager.isMouseUp()) {
                this.gameManager.reverseIsDown();
            }
        } else {
            // コンピュータターン
            const coordinate: Coordinate = this.computer.getCoordinate();
            if (coordinate.isInvalid()) return;
            if (this.tilemap.field.getMarkType(coordinate) !== MarkType.None) return;

            BattleService.gameFlow(this.gameManager, this.tilemap, coordinate);
            BattleService.gameJudge(this.gameManager, this.tilemap, this.titleText);
        }
    }
}