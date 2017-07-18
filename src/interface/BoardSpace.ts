import Piece from '../interface/Piece';
import { Player } from '../enums/Player';

export interface BoardSpace {
    piece?: Piece,
    player?: Player,
    column: string,
    row: number
}