import { TitleText } from "../entity/titleText";
import { Player } from "../entity/player";
import { Tilemap } from "../map/tilemap";
import { GameManager } from "../manager/gameManager";
import { SoundManager } from "../manager/soundManager";
import { BattleService } from "../service/battleService";
import { ComputerService } from "../service/computer/computerService";
import { ComputerServiceImpl } from "../service/computer/impl/randomImpl";

/**
 * ゲームプレイ画面
 */
export class GameScene extends Phaser.Scene {
    private gameManager?: GameManager;
    private soundManager?: SoundManager;
    private tilemap?: Tilemap;
    private titleText?: TitleText
    private player?: Player;
    private computer?: ComputerService;

    constructor() {
        super({ key: 'gameScene' });
    }

    init(data: any) {
        this.player = new Player(data.isSenko);
    }
    
    preload() {
        this.load.image('mapTiles', 'assets/images/maru_batsu.png');
        this.load.audio('winSound', 'assets/sounds/winSound.mp3');
        this.load.audio('loseSound', 'assets/sounds/loseSound.mp3');
        this.load.audio('setMarkSound', 'assets/sounds/setMarkSound.mp3');
        this.load.audio('notSetMarkSound', 'assets/sounds/notSetMarkSound.mp3');
    }

    create() {
        this.cameras.main.fadeIn(500, 255, 255, 255);
        this.gameManager = new GameManager(this);
        this.soundManager = new SoundManager(this);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.titleText = new TitleText(this);
        this.computer = new ComputerServiceImpl();
    }

    update() {
        if (!this.player || !this.computer || !this.gameManager || !this.soundManager || !this.tilemap || !this.titleText) return;

        if (BattleService.finishGame(this.tilemap)) {
            // 勝者が決まった場合
            BattleService.showWinner(this, this.tilemap, this.player, this.titleText);
        } else {
            // ゲームプレイ中
            BattleService.isPlayerTurn(this.gameManager, this.player)
                ? BattleService.playerTurn(this.gameManager, this.tilemap, this.soundManager)
                : BattleService.computerTurn(this.gameManager, this.tilemap, this.computer);
        }
    }
}