import { Cell } from "../types/index";
import { rouletteSequence } from "./rouletteSequence";

export default function buildCells(): Cell[] {
  return rouletteSequence.map((sequence, index) => ({
    id: index,
    color: sequence,
  }));
}
