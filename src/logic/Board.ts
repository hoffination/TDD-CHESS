import { Player } from '../enums/Player'
import { BoardSpace } from '../interface/BoardSpace';
import { Position } from '../interface/Position'
import * as json from '../../layouts/start.json'
import Turn from './Turn'

import Pawn from '../piece/Pawn'
import Rook from '../piece/Rook'
import Knight from '../piece/Knight'
import Bishop from '../piece/Bishop'
import Queen from '../piece/Queen'
import King from '../piece/King'

const rows = [1,2,3,4,5,6,7,8]

export default class Board {
    private currentTurn = Player.WHITE;
    positions:{[key:string]:{[key:number]:BoardSpace}} = {};

    constructor(positions?: {[key:string]:{[key:number]:BoardSpace}}) {
        if (positions) {
            this.positions = positions;
        } else {
            Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H').forEach(column => {
                this.positions[column] = {}
                rows.forEach(row => this.positions[column][row] = {row: row, column: column})
            })
            for (let i in (<any>json)) {
                console.log((<any>json)[1])
                // TODO: actually construct the chess pieces
                let description = (<any>json)[i];
                let owner = description.player ? Player.BLACK : Player.WHITE;
                if (description.piece === 'PAWN') {
                    description.piece = new Pawn(owner)
                } else if (description.piece === 'ROOK') {
                    description.piece = new Rook(owner)
                } else if (description.piece === 'KNIGHT') {
                    description.piece = new Knight(owner)
                } else if (description.piece === 'BISHOP') {
                    description.piece = new Bishop(owner)
                } else if (description.piece === 'QUEEN') {
                    description.piece = new Queen(owner)
                } else {
                    description.piece = new King(owner)
                }

                this.positions[(<any>json)[i].column][(<any>json)[i].row] = {row: description.row, column: description.column, player: owner, piece: description.piece}
            }
        }
        
    }

    public getTurn() {
        return this.currentTurn;
    }

    public renderBoard() {
        console.log(this.positions)
        rows.forEach(row => {
            let rowText = '';
            Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H').forEach(column =>
                rowText += (this.positions[column][row].piece ? this.positions[column][row].piece.renderChar : '-'))
                // console.log(column)
            console.log(rowText);
        })
    }

    public move(player: Player, pos1: Position, pos2: Position) {
        if (player !== this.currentTurn) {
            throw 'player moving is not the player whos turn it is'
        }
        this.currentTurn = Turn.next(this.currentTurn)
    }

}
