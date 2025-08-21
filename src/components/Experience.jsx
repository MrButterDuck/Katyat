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
  const fullText = "С днем рождения, люблю тебя💖";
  const [typing, setTyping] = useState(false);

const sectionStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#f0f0f0",
  fontFamily: "'Trebuchet MS', Helvetica, sans-serif",
  fontSize: "1.2rem",
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
              <h1>Привет, любимая булка💋</h1>
              <p>Поздравляю тебя с днем рождения! Вот мой небольшой <i>самодельный</i> подарок для тебя. Хочу немного напомнить, чем этот день поистине важен. Не забывай кликать на фотки, там тоже есть текст. Ну чтож, листай :)</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <p>Уже 21 год тебе, прикольное число. Надеюсь этот день ты классно проведешь...хотя я даже в этом не сомневаюсь. Так почему же он важен?</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <HoverImage
                url="src\assets\photos\20250511-IMG_2464.jpg"
                caption="А вот и ответ"
                textContent="Это - ты! И нет, это не подводка к дешевой психологической фразочке. 21 год назад появилась вот такая очаровательная и единсвтенная. А если бы не этот день, у меня бы не было такой замечательной девушки"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <GiftBox
                initialImage="src/assets/gift/gift_Anton_closed.png"
                openedImage="src/assets/gift/gift_Anton_opend.png"
                caption="А вот и тортик!"
                textContent="К сожалению быть стрептизершей, вылезающей из торта я не смог бы, и рядом меня нет для торта, но пусть это будет небольшой купон на желание, зажмурься и загадай, уверен, оно исполнится✨"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <p>И это еще один повод напомнить тебе, что я тебя очень сильно люблю, несмотря ни на что. Безумно люблю твои глаза, а на предыдущей фотке они прям в камеру смотрят. У фотографов есть такое правило - глаза всегда в фокусе. Все говорят о разных причинах этому, но на фото нас всегда действительно притягивают глаза, аля отражение души, с чем я даже согласен. Глаза действительно могут сказать многое, а в твоих я люблю просто тонуть иногда.</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <HoverImage
                url="src\assets\photos\20250713-IMG_2786.jpg"
                caption="Скаты Леопольди!"
                textContent="А еще очень сильно люблю, когда ты дурачишься. Моя жизнь - это сплошная серьезность, а ты вносишь в нее расслабленность и позитив. Пусть тебе и 21, не переставай быть дурашкой :)"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <p>Также этот день подарил миру(мне) человека с безумной добротой, что большая редкость. То, как ты относишься к животным, да к миру в целом, это что-то необычное в наше время. Ты как никто понимаешь мои чуства, когда я вижу бездомного котика на улице. Но главное, что твоя доброта не ограничивается ничем🔥</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <HoverImage
                url="src\assets\photos\5276422973483517019.jpg"
                caption="Больше не сычуем"
                textContent="Также благодаря тебе я стал чаще куда-то выбираться, причем в места, куда бы один не пошел. Тоже вносишь что-то новое"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <GiftBox
                initialImage="src/assets/gift2/gift_Leo_closed.png"
                openedImage="src/assets/gift2/gift_Leo_opend.png"
                caption="Смотри кто пришел тебя поздравить!"
                textContent="Оригинальный текст: мяу-мяяя *кусь за пятку* мряу            
                 Перевод: Поздравляю с днем рождения!"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <HoverImage
                url="src\assets\photos\5276422973483517023.jpg"
                caption="Модель!"
                textContent="Нравится мне, как сначала ты вся из себя такая важная леди, прям ух. Помню как на первом свидании аж занервничал, когда увидел такую красотку💅"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <HoverImage
                url="src\assets\photos\5276422973483517021.jpg"
                caption="Пукнуть"
                textContent="А потом ты резко становишься дурашкой и уже обсуждаешь, как жеска сделаешь со мной что-то 20 раз или просто дурачишься"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={contentStyle}>
              <p>Я помню все наши свидания, как вчера, смешные и не очень моментики, помню твой чудесный голос, глаза, волосы, помню твои особенности, помню наш первый поцелуй на маяке и многое другое. Но мне было бы нечего помнить, без этого дня. Если ничего не случилось 21 год назад, то мир был бы другим, я был бы другим. Празднуя дни рождения, я всегда вкладываю в это смысл не сколько дня, сколько случая значимости кого-то для меня. И тут конечно день действительно особенный. Поэтому я надеюсь он пройдет круто, радостно и запомнится. Надеюсь следующий твой день рождения я застану в живую, хотелось бы, конечно, обнять, поцеловать, и сказать это в живую, но что имеем. Желаю тебе того, чтобы через год в этот день можно было вложить еще больше значимости, воспоминаний, сбывшихся мечт и успехов💞</p>
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
