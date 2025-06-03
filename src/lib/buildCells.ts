import { Cell, CellColor } from "../types/index";

export default function buildCells(sequence: CellColor[]): Cell[] {
  return sequence.map((color, index) => ({
    id: index,
    color: color,
  }));
}
