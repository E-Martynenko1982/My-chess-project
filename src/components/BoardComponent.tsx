import React, { FC, useEffect, useState, useCallback } from "react";
import { Cell } from "../models/Cell";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Player } from "../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  const updateBoardWithHighlight = useCallback(() => {
    board.highlightCells(selectedCell);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board, selectedCell, setBoard]);

  useEffect(() => {
    updateBoardWithHighlight();
  }, [updateBoardWithHighlight]);

  return (
    <div>
      <h3>Current player: {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
