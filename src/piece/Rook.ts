import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class Rook implements Piece {
    private hasMoved = false;

    owner: Player;
    name: string = 'ROOK';
    renderChar: string = 'R';
    type = PieceType.ROOK;

    constructor(player: Player) {
        this.owner = player;
    }

    public canMove(board: {[key: string]: {[key: number]: BoardSpace}}, pos1: Position, pos2: Position): boolean {
        if (!board || !pos1 || !pos2)
            return false

        let vDist = pos2.row - pos1.row
        let hDist = Movement.columnDist(pos2.column, pos1.column)
        if (Math.abs(vDist) > 0 && Math.abs(hDist) > 0) {
            return false
        }
        // look for pieces that are in the way
        let rangeStart = (vDist ? pos1.row : pos1.column.charCodeAt(0))
        let rangeEnd = (vDist ? pos2.row : pos2.column.charCodeAt(0))
        let rangeDirection = vDist ? vDist / Math.abs(vDist) : hDist / Math.abs(hDist);
        rangeStart += rangeDirection;

        while (rangeStart !== rangeEnd) {
            if (vDist && board[pos1.column][rangeStart].piece) {
            return false
            } else if (hDist && board[String.fromCharCode(rangeStart)][pos1.row].piece) {
            return false
            }
            rangeStart += rangeDirection > 0 ? 1 : -1
        }

        if (!board[pos2.column][pos2.row].piece) {
            return true
        }
        if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner !== this.owner) {
            return true;
        }
        return false;
    }

    public move(pos1: Position, pos2: Position): void {
        this.hasMoved = true;
    }

    public turnUpdate(): void {}

    public canBeTakenEnPassant(): boolean {
        return false;
    }

    public movedStatus(): boolean {
        return this.hasMoved;
    }
}