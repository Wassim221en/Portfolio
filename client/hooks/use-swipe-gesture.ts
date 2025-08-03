import { useEffect, useRef } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  preventScroll?: boolean;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  preventScroll = false,
}: SwipeGestureOptions) {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isSwipingRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - startX.current;
      const deltaY = currentY - startY.current;

      // Check if this is more of a horizontal swipe than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isSwipingRef.current = true;
        
        if (preventScroll) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipingRef.current || e.changedTouches.length !== 1) return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX.current;

      // Check if swipe distance meets threshold
      if (Math.abs(deltaX) >= threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      isSwipingRef.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, preventScroll]);
}
