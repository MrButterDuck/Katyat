import {
  Environment,
  Float,
  OrbitControls,
  Scroll,
  ScrollControls,
  Text,
  Image,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Heart } from "./Heart";
import { FadeInSection } from "./FadeInSection";
import { NoiseBackground } from "./NoiseBackground";

export const Experience = () => {
  const scroll = useScroll();
  const heartRef = useRef();

  // typing effect
  const [typedText, setTypedText] = useState("");
  const fullText = "Конец скролла 🚀";
  const [typing, setTyping] = useState(false);

  useFrame(() => {
    const offset = scroll.offset; // 0 → 1

    // вращение сердца
    if (heartRef.current) {
      heartRef.current.rotation.y = offset * Math.PI * 2;
      heartRef.current.scale.setScalar(0.25 + offset * 0.5);
    }

    // если дошли до последнего экрана — запускаем печать текста
    if (offset > 0.95 && !typing) {
      setTyping(true);
    }
  });

  useEffect(() => {
    if (typing && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 120); // скорость печати (мс)
      return () => clearTimeout(timeout);
    }
  }, [typing, typedText]);

  const pages = 4;

  return (
    <>
      <color attach="background" args={["#1a4a3a"]} />
      <ambientLight intensity={2} />
      <directionalLight intensity={3} position={[5, 5, 5]} />
      <directionalLight intensity={1.5} position={[-5, 5, -5]} />
      <spotLight intensity={2.0} position={[0, 2, 5]} angle={0.3} penumbra={1} />
      <Environment preset="city" blur={0.4}/>
      
      <NoiseBackground />

      {/* Сердце на фоне */}
      <Float floatIntensity={2} speed={3}>
        <group ref={heartRef} position={[0, 0, 0]}>
          <Heart scale={0.5} />
        </group>
      </Float>

      {/* Текст/абзацы в Scroll html */}
      <Scroll html>
        <div style={{ width: "100vw" }}>
          <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FadeInSection pageIndex={0} pages={pages}>
              <h1>Первый абзац текста</h1>
            </FadeInSection>
          </section>

          <section style={{ height: "100vh", textAlign: "center" }}>
            <FadeInSection pageIndex={1} pages={pages}>
              <h2>Второй абзац</h2>
            </FadeInSection>
          </section>

          <section style={{ height: "100vh", textAlign: "center" }}>
            <FadeInSection pageIndex={2} pages={pages}>
              <h2>Третий абзац</h2>
            </FadeInSection>
          </section>

          <section
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontFamily: "monospace",
              whiteSpace: "pre",
            }}
          >
            <FadeInSection pageIndex={3} pages={pages}>
              {typedText}
              <span style={{ borderRight: "2px solid white", marginLeft: "2px", animation: "blink 1s step-start infinite" }} />
            </FadeInSection>
          </section>
        </div>
      </Scroll>

    </>
  );
};
