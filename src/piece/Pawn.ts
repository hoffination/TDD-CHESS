import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'
import Piece from '../interface/Piece';
import { Position } from '../interface/Position';
import { BoardSpace } from '../interface/BoardSpace';
import Movement from '../logic/Movement';

export default class Pawn implements Piece {
    private hasMoved = false;
    private enPassantable = false;
    private turnsSinceLastMove: number;
    private forwardDirection: number;

    owner: Player;
    name: string = 'PAWN'
    renderChar: string = 'P';
    type = PieceType.PAWN;

    constructor(player:Player) {
        this.owner = player
        this.forwardDirection = this.owner === Player.WHITE ? 1 : -1;
    }

    public move(pos1: Position, pos2: Position): void {
        this.hasMoved = true;
        if (Math.abs(pos1.row - pos2.row) == 2) {
            this.enPassantable = true;
        }
        this.turnsSinceLastMove = 0;
    }

    public canMove(board: {[key:string]:{[key:number]:BoardSpace}}, pos1: Position, pos2: Position): boolean {
        if (!board || !pos1 || !pos2)
            return false

        if ((this.forwardDirection > 0 && pos2.row < pos1.row) || (this.forwardDirection < 0 && pos2.row > pos1.row)) {
            return false
        }
        // check verticle move
        let vDist = Math.abs(pos2.row - pos1.row)
        let hDist = Movement.columnDist(pos1.column, pos2.column)
        if (hDist === 0) {
            if (vDist === 2 && this.movedStatus() || vDist > 2) {
                return false
            }
            if (vDist === 2 && !!board[pos2.column][pos2.row - 1].piece) {
                return false
            }
            // check if space is unobscured
            if (!board[pos2.column][pos2.row].piece) {
                return true
            }
        } else {
            if (hDist > 1 || vDist > 1 || vDist === 0) {
                return false;
            }
            if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner !== this.owner) {
                return true
            }
            // Check for en Passant
            if (hDist === 1 && vDist === 1) {
                let enPassantPosition = board[pos2.column][pos2.row - this.forwardDirection];
                if (!board[pos2.column][pos2.row].piece && enPassantPosition && enPassantPosition.piece) {
                    let piece = enPassantPosition.piece
                    if (piece.owner != this.owner && piece.canBeTakenEnPassant()) {
                        return true;
                    }
                }
            }
        }
        return false
    }

    public canBeTakenEnPassant(): boolean {
        return this.enPassantable;
    }

    public turnUpdate(): void {
        if (this.turnsSinceLastMove !== null) {
            this.turnsSinceLastMove++;
        }
        if (this.turnsSinceLastMove === 2 && this.enPassantable) {
            this.enPassantable = false
        }
    }

    public movedStatus(): boolean{
        return this.hasMoved;
    }
}