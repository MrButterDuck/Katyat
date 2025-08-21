import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const FadeInSection = ({ children, pageIndex, pages }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: '0px 0px -20% 0px', // Adjust to delay visibility trigger
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    if (inView && sectionRef.current) {
      sectionRef.current.classList.add('animate-fadeIn');
      sectionRef.current.classList.remove('animate-fadeOut');
    } else if (!inView && sectionRef.current) {
      sectionRef.current.classList.add('animate-fadeOut');
      sectionRef.current.classList.remove('animate-fadeIn');
    }
  }, [inView]);

  return (
    <div
      ref={sectionRef}
      className={`
        flex justify-center items-center
        w-full min-h-[30vh] py-4 px-4
        font-sans text-white
        transition-opacity duration-800 ease-in-out
        ${pageIndex === 3 ? 'justify-center' : ''} // Ensure fourth section is centered
        ${pageIndex === 4 ? 'mt-12' : ''} // Add margin-top for last section
      `}
    >
      <div ref={ref} className="max-w-2xl w-full text-center">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === 'h1') {
              return React.cloneElement(child, {
                className: 'text-2xl md:text-3xl font-bold mb-3',
              });
            }
            if (child.type === 'p') {
              return React.cloneElement(child, {
                className: 'text-base md:text-lg mb-4',
              });
            }
          }
          return child;
        })}
      </div>
    </div>
  );
};
