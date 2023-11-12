import { Coordinate } from "../entity/coordinate";
import { Tilemap } from "../map/tilemap";
import { GameManager } from "../manager/gameManager";
import { MarkType } from "../type/markType";

export class GameScene extends Phaser.Scene {
    private gameManager?: GameManager;
    private tilemap?: Tilemap;

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
    }

    update() {
        if (!this.gameManager || !this.tilemap) return;

        if (this.gameManager.isMouseDown()) {
            this.gameManager.reverseIsDown();
            
            const coordinate: Coordinate = new Coordinate(this.tilemap, this.gameManager.getMousePos());
            if (coordinate.isInvalid()) return;
            if (this.tilemap.field.getMarkType(coordinate) !== MarkType.None) return;

            this.gameManager.isSenkoTurn()
                ? this.tilemap.field.update(coordinate, MarkType.Maru)
                : this.tilemap.field.update(coordinate, MarkType.Batsu);

            this.gameManager.nextTurn();
            this.tilemap.updateTile(this.tilemap.field.getMarkType(coordinate), coordinate);

            const lineMark = this.tilemap.field.getLine();
            if (lineMark !== MarkType.None) {
                const winner = lineMark === MarkType.Maru ? 'Maru' : 'Batsu';
                console.log("Winner: " + winner);
            }
            if (this.tilemap.field.isFull()) {
                console.log('Draw');
            }
        } else if (this.gameManager.isMouseUp()) {
            this.gameManager.reverseIsDown();
        }
    }
}