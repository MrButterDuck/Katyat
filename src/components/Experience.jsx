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
import { ExpandableImage } from "./ExpandableImage";
import { HoverImage } from "./HoverImage"
import { GiftBox } from "./GiftBox"

export const Experience = () => {
  const scroll = useScroll();
  const heartRef = useRef();

  // typing effect
  const [typedText, setTypedText] = useState("");
  const fullText = "Конец скролла 🚀";
  const [typing, setTyping] = useState(false);

const sectionStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#f0f0f0",
  fontFamily: "monospace",
  fontSize: "1.5rem",
  textAlign: "center",
  padding: "0 5vw",
  boxSizing: "border-box",
  position: "relative",
  minHeight: "100vh",
};

  const contentStyle = {
    maxWidth: "800px",   // чтобы текст не растягивался на весь экран
  };

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

  const pages = 5;

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
          <section style={sectionStyle} >
            <div style={contentStyle}>
              <h1>Первый абзац текста</h1>
              <p>Много бла-бла-бла-</p>
              {/* <HoverImage
                url="src/assets/photos/20240831-IMG_0149.jpg"
                caption="Эта фотография рассказывает о важном событии."
                textContent="Это развернутое описание фотографии. Здесь можно добавить больше текста, чтобы описать событие или контекст изображения."
              /> */}
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <h1>Второй абзац текста</h1>
              <p>Много бла-бла-бла-</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <h1>Третий абзац текста</h1>
              <p>Много бла-бла-бла-</p>
              <HoverImage
                url="src/assets/photos/20241013-IMG_0667.jpg"
                caption="Эта фотография рассказывает о важном событии."
                textContent="Это развернутое описание фотографии. Здесь можно добавить больше текста, чтобы описать событие или контекст изображения."
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <GiftBox
                initialImage="src/assets/gift2/gift_Leo_closed.png"
                openedImage="src/assets/gift2/gift_Leo_opend.png"
                caption="Сюрприз!"
                textContent="Поздравляем! Вот твой подарок. 🎁"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              {typedText}
              <span
                style={{
                  borderRight: "2px solid white",
                  marginLeft: "2px",
                  animation: "blink 1s step-start infinite",
                }}
              />
            </div>
          </section>
        </div>
      </Scroll>


    </>
  );
};
