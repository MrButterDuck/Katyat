import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

export const HoverImage = ({ url, caption, textContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef(null);

  // Блокируем скролл при открытии изображения
  useEffect(() => {
    const scrollContainer = document.querySelector('div[style*="overflow: auto"]') || document.body;

    if (isOpen) {
      scrollContainer.style.overflow = 'hidden';
    } else {
      scrollContainer.style.overflow = 'auto';
    }

    return () => {
      scrollContainer.style.overflow = 'auto';
    };
  }, [isOpen]);

  const imageVariants = {
    initial: { scale: 0.3, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 0.32, y: [0, -10, 0], transition: { y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }, scale: { duration: 0.3 } } },
    expanded: { scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const ExpandedImage = ({ isOpen, url, caption, textContent, imageVariants, setIsOpen }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <AnimatePresence>
        {/* Фон */}
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[900]"
          onClick={() => setIsOpen(false)}
        />

        {/* Контейнер с изображением и текстом */}
        <motion.div
          key="expanded-image"
          variants={imageVariants}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-[1001] cursor-pointer p-4 overflow-auto"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={url}
            alt={caption}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
          {caption && (
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-white text-center bg-black/50 px-4 py-2 rounded"
            >
              {caption}
            </motion.div>
          )}
          {textContent && (
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-2 text-white text-center bg-black/40 px-4 py-2 rounded max-w-md"
            >
              {textContent}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <div className="relative">
    {!isOpen && (
        <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="initial"
            animate="hover"
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer mx-auto z-[1] flex flex-col items-center"
        >
            <div
            className="
                w-[70%] sm:w-[80%] md:w-[85%] lg:w-[90%] 
                max-w-[400px] h-auto rounded-lg overflow-hidden
            "
            >
            <img
                src={url}
                alt={caption}
                className="w-full h-full object-cover rounded-lg"
            />
            </div>
            {caption && (
            <p className="
                mt-3 text-center text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold
            ">
                {caption}
            </p>
            )}
        </motion.div>
        )}

      <ExpandedImage
        isOpen={isOpen}
        url={url}
        caption={caption}
        textContent={textContent}
        imageVariants={imageVariants}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
