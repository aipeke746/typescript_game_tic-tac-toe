import { Field } from "../entity/field";
import { Coordinate } from "../entity/coordinate";
import { MarkType } from "../type/markType";

/**
 * タイルマップを扱うクラス
 */
export class Tilemap {
    /**
     * フィールド
     */
    public field: Field;
    /**
     * タイルマップ
     */
    private map: Phaser.Tilemaps.Tilemap;
    /**
     * タイルセット
     */
    private tileset: Phaser.Tilemaps.Tileset;
    /**
     * タイルマップのレイヤー
     */
    private layer: Phaser.Tilemaps.TilemapLayer;

    constructor(scene: Phaser.Scene, tilesetName: string) {
        this.field = new Field();
        this.map = scene.make.tilemap({ data: this.field.getMain(), tileWidth: this.field.getSize(), tileHeight: this.field.getSize() });
        this.tileset = this.getTileset(tilesetName, this.map);
        this.layer = this.getLayer(this.tileset);
    }

    /**
     * タイルマップの座標を指定してマークを更新する
     * @param mark マークの種類
     * @param coordinate タイルマップの座標
     */
    public updateTile(mark: MarkType, coordinate: Coordinate) {
        const [tx, ty] = coordinate.getValue();
        this.layer.putTileAt(mark, tx, ty);
    }

    /**
     * タイルセットを取得する
     * @param name タイルセットの名前
     * @param map タイルマップ
     * @returns タイルセット
     */
    private getTileset(name: string, map: Phaser.Tilemaps.Tilemap) {
        const tileset = map.addTilesetImage(name);
        if (tileset == null)  {
            throw new Error('tileset is null');
        }
        return tileset;
    }

    /**
     * タイルマップのレイヤーを取得する
     * @param tileset タイルセット
     * @returns タイルマップのレイヤー
     */
    private getLayer(tileset: Phaser.Tilemaps.Tileset) {
        const layer = this.map?.createLayer(0, tileset, 0, 0);
        if (layer == null)  {
            throw new Error('layer is null');
        }
        return layer;
    }
}