import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class King implements Piece {
    private hasMoved = false;

    owner: Player;
    name: string = 'KING';
    renderChar: string = 'K';
    type = PieceType.KING;

    constructor(player: Player) {
        this.owner = player;
    }

    public canMove(board: { [key: string]: { [key: number]: BoardSpace } }, pos1: Position, pos2: Position): boolean {
        let vDist = pos2.row - pos1.row
        let hDist = Movement.columnDist(pos2.column, pos1.column)

        if (Math.abs(vDist) === 1 || Math.abs(hDist) === 1) {
            if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner === this.owner) {
                return false
            }
            return true
        }

        // Check for castling (assume king moves first)
        if (Math.abs(hDist) === 2 && !this.hasMoved) {
            let cornerRookPosition = hDist === -2 ? board.A[1] : board.H[1]
            if (cornerRookPosition.piece && cornerRookPosition.piece.type === PieceType.ROOK && !cornerRookPosition.piece.movedStatus()) {
                return true
            }
        }

        return false
    }

    public move(pos1: Position, pos2: Position): void {
        this.hasMoved = true;
    }

    public turnUpdate(): void {}

    public canBeTakenEnPassant(): boolean {
        return false;
    }

    public movedStatus(): boolean{
        return this.hasMoved;
    }
}