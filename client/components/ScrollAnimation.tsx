import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

export function ScrollAnimation({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: ScrollAnimationProps) {
  const getVariants = () => {
    const baseTransition = {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -60 },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: -60 },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'fade':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: baseTransition }
        };
      default:
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        margin: "-100px 0px -100px 0px" 
      }}
    >
      {children}
    </motion.div>
  );
}
