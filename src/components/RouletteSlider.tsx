"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import RedSvg from "./ui/RedSvg";
import BlackSvg from "./ui/BlackSvg";
import GreenSvg from "./ui/GreenSvg";
import JockerSvg from "./ui/JockerSvg";
import { RouletteSliderProps } from "../types";

const iconMap = {
  red: <RedSvg />,
  black: <BlackSvg />,
  green: <GreenSvg />,
  jockerBlack: <JockerSvg color="var(--dark-4)" />,
  jockerRed: <JockerSvg color="var(--fishka-red)" />,
};

const placeholderChips = (
  <div className="border-t-2 bg-yellow-500 border-solid border-white/20 w-[100px] h-[100px] flex items-center justify-center rounded-[0.5rem] text-red-500 text-3xl font-bold">
    ?
  </div>
);

const cellWidth = 100;
const gap = 8;
const visibleWidth = 1280; // В идеале динамически получать ширину контейнера

export default function RouletteSlider({
  cells,
  winnerIndex,
}: RouletteSliderProps) {
  const prevWinnerIndexRef = useRef<number | null>(null);

  // Використовуємо стан для управління цільовою позицією та "скиданням" анімації
  const [animationProps, setAnimationProps] = useState<{
    initialX: number;
    targetX: number;
    key: number;
  }>({
    initialX: 0,
    targetX: 0,
    key: 0,
  });

  const formatedCells = useMemo(() => {
    const repetitions = 10;
    let duplicatedCells: typeof cells = [];
    for (let i = 0; i < repetitions; i++) {
      duplicatedCells = duplicatedCells.concat(cells);
    }
    return duplicatedCells;
  }, [cells]);

  useEffect(() => {
    // Якщо немає фішок, або переможець не визначений, виходимо
    if (!cells.length || winnerIndex === null || winnerIndex === undefined) {
      return;
    }
    // Якщо winnerIndex не змінився з попереднього разу, не запускаємо анімацію
    if (winnerIndex === prevWinnerIndexRef.current) {
      return;
    }

    prevWinnerIndexRef.current = winnerIndex; // Оновлюємо посилання на поточний winnerIndex для наступної аниме

    const totalCellWidth = cellWidth + gap; // Ширини однієї  фішки + проміжок

    // --- Логіка для розрахунку `initialX` (стартової позиції) та `targetX` (кінцевої позиції) ---
    // 4. Визначення початкової позиції анімації
    // 'startRepetitionIndex' - це індекс "копії" масиву 'cells' у 'formatedCells', з якої ми хочемо розпочати анімацію.
    // Наприклад, '3' означає, що анімація розпочнеться з 4-ї копії 'cells' (індексація з 0).
    const startRepetitionIndex = 3;

    // 'initialPositionOffset' - це абсолютне зміщення в пікселях до початку цієї 'startRepetitionIndex' копії.
    const initialPositionOffset =
      cells.length * startRepetitionIndex * totalCellWidth;

    // 'newInitialXCalculated' - це координата X, куди рулетка буде миттєво "телепортована" на початку.
    // Від'ємне значення означає зміщення вліво. Це точка, з якої почнеться анімація.
    const newInitialXCalculated = -initialPositionOffset;

    // Визначення кінцевої позиції анімації (де зупиниться переможець)
    // 'targetRepetitionIndex' - це індекс "копії" масиву 'cells', в якій має зупинитися переможець.
    // Наприклад, '6' означає 7-у копію 'cells'. Це гарантує достатньо "обертів" рулетки.
    const targetRepetitionIndex = 6;

    // 'winnerAbsoluteIndexInDuplicated' - це абсолютний індекс виграшної фішки в усьому довгому 'formatedCells'.
    // Ми додаємо 'winnerIndex' до початку цільової копії.
    const winnerAbsoluteIndexInDuplicated =
      cells.length * targetRepetitionIndex + winnerIndex;

    // це абсолютна позиція центру виграшної фішки в пікселях від початку 'formatedCells'.
    const winnerCellCenterAbsolute =
      winnerAbsoluteIndexInDuplicated * totalCellWidth + cellWidth / 2;

    //'newTargetXCalculated' - це координата X, де рулетка має зупинитися, щоб виграшна фішка
    // була точно по центру 'visibleWidth' (ширини видимої області).
    // `visibleWidth / 2` - це половина ширини контейнера, щоб відцентрувати.
    const newTargetXCalculated = -(winnerCellCenterAbsolute - visibleWidth / 2);

    // 6. Оновлення стану, що запускає анімацію через перемонтирование
    // 'setAnimationProps' оновлює стан компонента.
    setAnimationProps((prev) => ({
      initialX: newInitialXCalculated,
      targetX: newTargetXCalculated,
      // 'key': Збільшуємо 'key' на 1. Це критично!
      // Коли 'key' змінюється, React вважає, що це абсолютно новий елемент <motion.ul>.
      // Він повністю видаляє старий <motion.ul> з DOM і вставляє новий.
      // Це примусове перемонтирование компонента <motion.ul>, що, в свою чергу,
      // змушує Framer Motion запускати анімацію знову від 'initialX' до 'targetX'.
      key: prev.key + 1, // Меняем ключ для перезапуска анимации
    }));
  }, [winnerIndex, cells.length, cells]);

  return (
    <div className="w-full overflow-hidden">
      <div className="absolute inset-y-0 left-1/2 w-1 border-l-8 h-6 border-yellow-300 z-10 -translate-x-1/2"></div>
      <motion.ul
        key={animationProps.key} // **Ключ для принудительного перезапуска анимации!**
        className="flex gap-2 py-3"
        initial={{ x: animationProps.initialX }}
        animate={{ x: animationProps.targetX }}
        transition={{
          type: "spring",
          stiffness: 9,
          damping: 5.6,
          bounce: 0.2,
          mass: 1.1,
          duration: 5,
        }}
      >
        {formatedCells.map((cell, index) => (
          <li
            key={`${cell.id}-${index}`}
            className={clsx(
              `rounded-[8px] flex items-center justify-center w-[100px] h-[100px]`
            )}
            style={{ flexShrink: 0 }}
          >
            {iconMap[cell.color] ?? placeholderChips}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
