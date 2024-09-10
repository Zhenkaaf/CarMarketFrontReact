/* import { useEffect } from "react";

const useDisableNumberInputWheel = () => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.type === "number") {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default useDisableNumberInputWheel; */

import { useEffect } from "react";

export const useDisableNumberInputWheel = () => {
  useEffect(() => {
    let scrollTimeout: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.type === "number") {
        e.preventDefault();

        // Параметры для плавной прокрутки
        const scrollAmount = e.deltaY < 0 ? -80 : 80; // Размер прокрутки
        const start = window.scrollY;
        const end = start + scrollAmount;
        const duration = 150; // Продолжительность анимации в миллисекундах
        let startTime: number | null = null;

        // Функция для плавной прокрутки
        const smoothScroll = (timestamp: number) => {
          if (startTime === null) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const scrollPosition = start + (end - start) * progress;
          window.scrollTo(0, scrollPosition);

          if (progress < 1) {
            scrollTimeout = window.requestAnimationFrame(smoothScroll);
          }
        };

        // Запуск анимации прокрутки
        if (scrollTimeout !== null) {
          window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (scrollTimeout !== null) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};
