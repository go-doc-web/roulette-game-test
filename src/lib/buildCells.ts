import { Cell, CellColor } from "../types/index";
import { v4 as uuidv4 } from "uuid";

export default function buildCells(sequence: CellColor[]): Cell[] {
  return sequence.map((color) => ({
    id: uuidv4(),
    color: color,
  }));
}
