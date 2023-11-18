import { Coordinate } from "../../entity/coordinate";

/**
 * コンピューターが行う処理を定義するインターフェース
 */
export interface ComputerService {
    getCoordinate(): Coordinate;
}