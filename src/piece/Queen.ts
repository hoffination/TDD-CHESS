import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class Queen implements Piece {
    owner: Player;
    name: string = 'QUEEN';
    renderChar: string = 'Q';
    type = PieceType.QUEEN;

    constructor(player: Player) {
        this.owner = player;
    }

    public canMove(board: { [key: string]: { [key: number]: BoardSpace } }, pos1: Position, pos2: Position): boolean {
        if (!board || !pos1 || !pos2)
            return false

        let vDist = pos2.row - pos1.row
        let hDist = Movement.columnDist(pos2.column, pos1.column)
        let destination = board[pos2.column][pos2.row];

        if (!destination.piece || destination.piece.owner !== this.owner) {
            let vDirection = Math.abs(vDist) / vDist || 0;
            let hDirection = Math.abs(hDist) / hDist || 0;
            let curr = { row: pos1.row + vDirection, column: String.fromCharCode(pos1.column.charCodeAt(0) + hDirection) };

            while (curr.row !== pos2.row || curr.column !== pos2.column) {
                if (board[curr.column][curr.row].piece) {
                    return false
                }
                curr.row += vDirection;
                curr.column = String.fromCharCode(curr.column.charCodeAt(0) + hDirection);
            }

            return true
        }

        return false;
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