import { useEffect, useRef } from "react";

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');

interface LoadingProps {
  text?: string;
  cycleCount?: number;
  resetDelay?: number;
}

export function Loading({ text = "LOADING...", cycleCount = 5, resetDelay = 750 }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // إعداد الحروف span لكل حرف
    const letters: HTMLSpanElement[] = [];
    containerRef.current.innerHTML = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = "-";
      span.dataset.orig = char;
      containerRef.current?.appendChild(span);
      letters.push(span);
    });

    let letterCurrent = 0;
    let cycleCurrent = 0;
    let done = false;

    const getChar = () => chars[Math.floor(Math.random() * chars.length)];

    const loop = () => {
      letters.forEach((span, idx) => {
        if (idx >= letterCurrent && span.textContent !== " ") {
          span.textContent = getChar();
          span.style.opacity = `${Math.random()}`;
        }
      });

      if (cycleCurrent < cycleCount) {
        cycleCurrent++;
      } else if (letterCurrent < letters.length) {
        const curr = letters[letterCurrent];
        curr.textContent = curr.dataset.orig;
        curr.style.opacity = "1";
        curr.classList.add("done");
        cycleCurrent = 0;
        letterCurrent++;
      } else {
        done = true;
      }

      if (!done) {
        requestAnimationFrame(loop);
      } else {
        setTimeout(() => {
          letterCurrent = 0;
          cycleCurrent = 0;
          done = false;
          letters.forEach(span => {
            span.textContent = span.dataset.orig!;
            span.classList.remove("done");
          });
          loop();
        }, resetDelay);
      }
    };

    loop();
  }, [text, cycleCount, resetDelay]);

  return (
    <>
      <style>{`
        html, body { height: 100%; margin: 0; padding: 0; }
        .loading-container { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
        .word {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Source Code Pro', monospace;
          font-size: 2.5em;
          color: #fff;
          text-shadow: 0 0 10px rgba(50,255,50,0.5), 0 0 5px rgba(100,255,100,0.5);
        }
        .word span { display: inline-block; transform: translateX(100%) scale(0.9); transition: transform 500ms; }
        .word .done { color: #6f6; transform: translateX(0) scale(1); }
        .overlay { position:absolute; top:0; left:0; right:0; bottom:0; background-image: linear-gradient(transparent 0%, rgba(10,16,10,0.5) 50%); }
      `}</style>
      <div className="loading-container">
        <div className="word" ref={containerRef}></div>
        <div className="overlay"></div>
      </div>
    </>
  );
}
