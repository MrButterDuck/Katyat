import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const ExpandableImage = ({ image, caption, text }) => {
  const [open, setOpen] = useState(false);

  // Блокируем скролл при открытии
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Добавляем padding-right для компенсации исчезнувшего скроллбара
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <div className="relative">
      {/* Миниатюра */}
      <div className="cursor-pointer inline-block" onClick={() => setOpen(true)}>
        <img
          src={image}
          alt={caption || "thumbnail"}
          className="w-48 h-32 object-cover rounded-xl shadow-lg hover:scale-105 transition"
        />
        {caption && <p className="text-sm mt-2 text-gray-400">{caption}</p>}
      </div>

      {/* Расширенный вид */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="bg-white/10 rounded-2xl shadow-2xl p-6 flex gap-6 items-center max-w-5xl mx-4"
            style={{
              position: 'relative',
              transform: 'translate(0, 0)' // Сброс любых трансформаций
            }}
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Фото с покачиванием */}
            <motion.img
              src={image}
              alt="expanded"
              className="w-[400px] h-[300px] object-cover rounded-xl shadow-lg"
              animate={{
                y: [0, -8, 0, 8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Текст справа */}
            <div className="text-white text-left max-w-md">
              <h2 className="text-2xl font-bold mb-4">{caption}</h2>
              <p className="text-base leading-relaxed">{text}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};