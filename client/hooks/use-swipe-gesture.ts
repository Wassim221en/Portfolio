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
      const deltaY = e.changedTouches[0].clientY - startY.current;

      // التأكد من أن هذا swipe أفقي حقيقي
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 2;

      // Check if swipe distance meets threshold and is horizontal
      if (Math.abs(deltaX) >= threshold && isHorizontalSwipe) {
        // للسحب من اليمين (فتح): يجب أن يبدأ من الحافة اليسرى
        if (deltaX > 0 && onSwipeRight && startX.current <= edgeThreshold) {
          onSwipeRight();
        }
        // للسحب من اليسار (إغلاق): يمكن من أي مكان
        else if (deltaX < 0 && onSwipeLeft) {
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
