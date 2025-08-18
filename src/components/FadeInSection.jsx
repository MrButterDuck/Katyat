import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const FadeInSection = ({ children, pageIndex, pages }) => {
  const ref = useRef();
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset; // 0 → 1
    const target = pageIndex / (pages - 1);
    const distance = Math.abs(offset - target);

    // прозрачность и сдвиг по Y
    const opacity = Math.max(0, 1 - distance * 5); // плавный fade
    const translateY = distance * 100; // px смещения

    if (ref.current) {
      ref.current.style.opacity = opacity;
      ref.current.style.transform = `translateY(${translateY}px)`;
    }
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(100px)",
        transition: "opacity 0.3s linear, transform 0.3s linear",
      }}
    >
      {children}
    </div>
  );
};
