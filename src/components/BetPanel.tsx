import DivContainer from "./DivContainer";
import RecentRolls from "./RecentRolls";

import { ROULETTE_CONTAINER_MAX_WIDTH_PX } from "../constants/index";

export default function BetPanel() {
  return (
    <section>
      <DivContainer
        width={ROULETTE_CONTAINER_MAX_WIDTH_PX}
        className="pt-4 mx-auto"
      >
        <RecentRolls />
        <RecentRolls />
      </DivContainer>
    </section>
  );
}
