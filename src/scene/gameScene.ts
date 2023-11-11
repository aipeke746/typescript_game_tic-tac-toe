enum Mark {
    None = 0,
    Maru = 1,
    Batsu = 2,
}

export class GameScene extends Phaser.Scene {
    private MAP_SIZE = 128
    private FIELD: Mark[][] = Array.from(Array(3), () => new Array(3).fill(0));

    private map?: Phaser.Tilemaps.Tilemap;
    private tileset?: Phaser.Tilemaps.Tileset;
    private layer?: Phaser.Tilemaps.TilemapLayer;

    private pointer?: Phaser.Input.Pointer;
    private isDown = false;
    private isSenko = true;
    private count = 0;

    private field_buf: Mark[][] = this.FIELD;

    constructor() {
        super({ key: 'gameScene' });
    }
    
    preload() {
        this.load.image('mapTiles', 'assets/images/maru_batsu.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 255, 255, 255);

        this.map = this.make.tilemap({ data: this.field_buf, tileWidth: this.MAP_SIZE, tileHeight: this.MAP_SIZE });
        this.tileset = this.getTileset('mapTiles', this.map);
        this.layer = this.getLayer(this.tileset);

        this.pointer = this.input.activePointer;
    }

    update() {
        if (!this.pointer || !this.tileset || !this.layer) return;

        if (this.pointer.isDown && !this.isDown) {
            this.isDown = true;
            const tilePos = this.getTileCoordinate(this.pointer.x, this.pointer.y);

            if (this.field_buf[tilePos[1]][tilePos[0]] === Mark.None) {
                this.isSenko
                    ? this.field_buf[tilePos[1]][tilePos[0]] = Mark.Maru
                    : this.field_buf[tilePos[1]][tilePos[0]] = Mark.Batsu;

                this.isSenko = !this.isSenko;
                this.count++;
                this.layer.putTileAt(this.field_buf[tilePos[1]][tilePos[0]], tilePos[0], tilePos[1]);

                const checkWinner = this.checkWinner();
                if (checkWinner !== Mark.None) {
                    const winner = checkWinner === Mark.Maru ? 'Maru' : 'Batsu';
                    console.log("Winner: " + winner);
                }
                if (this.count == this.field_buf.length * this.field_buf.length) {
                    console.log('Draw');
                }
            }
        } else if (!this.pointer.isDown && this.isDown) {
            this.isDown = false;
        }
    }

    private checkLine(line: number[]): number {
        const [a, b, c] = line;
        return a === b && a === c ? a : Mark.None;
    }

    private checkWinner(): number {
        // 横
        for (let i=0; i<this.field_buf.length; i++) {
            if (this.checkLine(this.field_buf[i]) !== Mark.None) {
                return this.field_buf[i][0];
            }
        }
        // 縦
        for (let i=0; i<this.field_buf.length; i++) {
            if (this.checkLine([this.field_buf[0][i], this.field_buf[1][i], this.field_buf[2][i]]) !== Mark.None) {
                return this.field_buf[0][i];
            }
        }
        // 斜め
        if (this.checkLine([this.field_buf[0][0], this.field_buf[1][1], this.field_buf[2][2]]) !== Mark.None) {
            return this.field_buf[0][0];
        }
        return Mark.None;
    }

    private getTileCoordinate(x: number, y: number): [number, number] {
        const tx = Math.floor(x / this.MAP_SIZE);
        const ty = Math.floor(y / this.MAP_SIZE);
        return [tx, ty];
    }

    private getTileset(name: string, map: Phaser.Tilemaps.Tilemap) {
        const tileset = map.addTilesetImage(name);
        if (tileset == null)  {
            throw new Error('tileset is null');
        }
        return tileset;
    }

    private getLayer(tileset: Phaser.Tilemaps.Tileset) {
        const layer = this.map?.createLayer(0, tileset, 0, 0);
        if (layer == null)  {
            throw new Error('layer is null');
        }
        return layer;
    }
}