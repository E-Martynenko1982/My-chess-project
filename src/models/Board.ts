import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];


  public initCells() {
    for (let index = 0; index < 8; index++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((index + j) % 2 !== 0) {
          row.push(new Cell(this, j, index, Colors.BLACK, null)) // Black cells
        } else {
          row.push(new Cell(this, j, index, Colors.WHITE, null)) //White cells
        }

      }
      this.cells.push(row)
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let index = 0; index < this.cells.length; index++) {
      const row = this.cells[index];
      for (let ind = 0; ind < row.length; ind++) {
        const target = row[ind];
        target.avaliable = !!selectedCell?.figure?.canMove(target)

      }
    }
  }
  public getCell(x: number, y: number) {
    return this.cells[y][x]
  }

  //to do Fisher method

  private addPawns() {
    for (let index = 0; index < 8; index++) {
      new Pawn(Colors.BLACK, this.getCell(index, 1))
      new Pawn(Colors.WHITE, this.getCell(index, 6))

    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }
  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(7, 0))
    new Rook(Colors.WHITE, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
  }
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
  }

  public addFigure() {
    this.addBishops()
    this.addKings()
    this.addKnights()
    this.addPawns()
    this.addQueens()
    this.addRooks()
  }
}