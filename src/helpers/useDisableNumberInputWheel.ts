import { useEffect } from "react";

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

export default useDisableNumberInputWheel;
