import { Position } from './Position';
import { BoardSpace } from '../interface/BoardSpace';
import { Player } from '../enums/Player';
import { PieceType } from '../enums/PieceType'

interface Piece {
    canMove(board:{[key:string]:{[key:number]:BoardSpace}}, pos1:Position, pos2:Position): boolean
    move(pos1:Position, pos2:Position) : void
    turnUpdate() : void
    canBeTakenEnPassant(): boolean
    movedStatus(): boolean
    
    owner:Player,
    name:string,
    renderChar:string,
    type: PieceType
}

export default Piece