import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class Knight implements Piece {
    private hasMoved = false;

    owner: Player;
    name: string = 'KNIGHT';
    renderChar: string = 'K';
    type = PieceType.KNIGHT;

    constructor(player: Player) {
        this.owner = player;
    }

    public canMove(board: { [key: string]: { [key: number]: BoardSpace } }, pos1: Position, pos2: Position): boolean {
        let vDist = Math.abs(pos1.row - pos2.row)
        let hDist = Math.abs(Movement.columnDist(pos1.column, pos2.column));
        if (vDist > 0 && vDist < 3 && hDist > 0 && hDist < 3 && hDist + vDist === 3) {
            if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner === this.owner) {
                return false
            }
            return true
        }
        return false
    }

    public move(pos1: Position, pos2: Position): void { }

    public turnUpdate(): void { }

    public canBeTakenEnPassant(): boolean {
        return false;
    }

    public movedStatus(): boolean {
        return false;
    }
}