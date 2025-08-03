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
  const edgeThreshold = 30; // المنطقة من حافة الشاشة للبدء بالسحب

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
      isSwipingRef.current = false;

      // للسحب من اليسار: يجب أن يبدأ اللمس من حافة الشاشة اليسرى
      // للسحب من اليمين: يمكن أن يبدأ من أي مكان إذا كان السايدبار مفتوح
      const isFromLeftEdge = touch.clientX <= edgeThreshold;
      const isValidStart = isFromLeftEdge || onSwipeLeft;

      if (!isValidStart) {
        return;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - startX.current;
      const deltaY = currentY - startY.current;

      // التحقق من أن هذا سحب أفقي وليس عمودي
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
      const hasSignificantDistance = Math.abs(deltaX) > 30;

      // فقط اعتبره swipe إذا كان أفقي وبمسافة كبيرة
      if (isHorizontalSwipe && hasSignificantDistance) {
        isSwipingRef.current = true;

        // منع التمرير فقط عند وجود swipe حقيقي ومطلوب منع التمرير
        if (preventScroll && isSwipingRef.current) {
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
