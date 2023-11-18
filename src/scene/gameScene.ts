import { Coordinate } from "../entity/coordinate";
import { Tilemap } from "../map/tilemap";
import { GameManager } from "../manager/gameManager";
import { MarkType } from "../type/markType";
import { BattleService } from "../service/battleService";
import { CoordinateFactory } from "../factory/coordinateFactory";
import { TitleText } from "../entity/titleText";

export class GameScene extends Phaser.Scene {
    private gameManager?: GameManager;
    private tilemap?: Tilemap;
    private titleText?: TitleText

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
    }

    update() {
        if (!this.gameManager || !this.tilemap || !this.titleText) return;

        // 勝者が決まった場合
        if (this.gameManager.getWinner() !== MarkType.None) {
            BattleService.showWinner(this, this.gameManager);
            return;
        }

        // ゲームプレイ中
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
    }
}