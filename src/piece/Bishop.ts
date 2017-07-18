import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType';
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class Bishop implements Piece {
    owner: Player;
    name: string = 'BISHOP';
    renderChar: string = 'B';
    type = PieceType.BISHOP;

    constructor(player: Player) {
        this.owner = player;
    }

    public canMove(board: { [key: string]: { [key: number]: BoardSpace } }, pos1: Position, pos2: Position): boolean {
        let vDist = pos2.row - pos1.row
        let hDist = Movement.columnDist(pos2.column, pos1.column)
        if (Math.abs(vDist) - Math.abs(hDist) !== 0 || vDist === 0)
            return false

        let vDirection = vDist / Math.abs(vDist)
        let hDirection = hDist / Math.abs(hDist)
        let current = { vPos: pos1.row + vDirection, hPos: pos1.column.charCodeAt(0) + hDirection }
        // Check to see if there are any other pieces along the path to the second location
        while (current.vPos !== pos2.row) {
            if (board[String.fromCharCode(current.hPos)][current.vPos].piece)
                return false
            current.vPos += vDirection
            current.hPos += hDirection
        }
        if (!board[pos2.column][pos2.row].piece || board[pos2.column][pos2.row].piece.owner !== this.owner) {
            return true
        }
        return false
    }

    public move(pos1: Position, pos2: Position): void {}

    public turnUpdate(): void {}

    public canBeTakenEnPassant(): boolean {
        return false;
    }
    
    public movedStatus(): boolean {
        return false;
    }
}