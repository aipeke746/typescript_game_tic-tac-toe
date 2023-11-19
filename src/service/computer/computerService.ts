import { Coordinate } from "../../entity/coordinate";
import { Player } from "../../entity/player";
import { Tilemap } from "../../map/tilemap";

/**
 * コンピューターが行う処理を定義するインターフェース
 */
export interface ComputerService {
    getCoordinate(tilemap: Tilemap, player: Player): Coordinate;
}