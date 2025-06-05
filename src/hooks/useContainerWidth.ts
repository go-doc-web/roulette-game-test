import { useState, useEffect, useRef } from "react";

/**
 * Custom React Hook для динамічного вимірювання ширини DOM-елемента.
 * Використовує ResizeObserver для ефективного відстеження змін розміру.
 *
 * @returns [ref, width] - Масив, що містить:
 * - ref: React.RefObject<T> - Реф, який потрібно прив'язати до DOM-елемента, ширину якого ви хочете виміряти.
 * - width: number - Поточна ширина елемента в пікселях.
 */

export function useContainerWidth<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setContainerWidth(containerRef.current!.offsetWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [containerRef, containerWidth] as const;
}
