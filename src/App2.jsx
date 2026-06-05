import "./App2.css";
import { useEffect, useRef, useState } from "react";

function App2() {
  const [count, setCount] = useState(0);
  const [isDay, setIsDay] = useState(false);
  const intervalRef = useRef(null);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowUp") increment();
      if (e.key === "ArrowDown") decrement();
      if (e.key.toLowerCase() === "r") reset();
      if (e.key.toLowerCase() === "t") setIsDay((d) => !d);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // long-press: start a timer on press; single click is handled by onClick.
  const pressTimerRef = useRef(null);
  function handlePressStart(fn) {
    // start repeating only after a short delay to allow normal click to fire once
    pressTimerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(fn, 120);
      pressTimerRef.current = null;
    }, 350);
  }
  function handlePressEnd() {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div className={isDay ? "root day" : "root night"}>
      <div className="panel">
        <div className="top-row">
          <h2 className="brand">Beautiful Counter</h2>

          <button
            className="theme-toggle"
            onClick={() => setIsDay((d) => !d)}
            aria-pressed={isDay}
            title={isDay ? "Switch to Night" : "Switch to Day"}
          >
            {isDay ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 12a9 9 0 1010.95-8.95A7 7 0 013 12z" fill="#f59e0b"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#fff"/>
              </svg>
            )}
            <span className="sr-only">Toggle day night</span>
          </button>
        </div>

        <div className="counter" aria-live="polite">
          <div className="count" key={count}>{count}</div>
        </div>

        <div className="controls">
          <button
            className="control minus"
            onClick={decrement}
            onMouseDown={() => handlePressStart(decrement)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(decrement)}
            onTouchEnd={handlePressEnd}
            aria-label="Decrement"
          >
            <span className="icon">−</span>
          </button>

          <button
            className="control reset"
            onClick={reset}
            aria-label="Reset"
          >
            Reset
          </button>

          <button
            className="control plus"
            onClick={increment}
            onMouseDown={() => handlePressStart(increment)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(increment)}
            onTouchEnd={handlePressEnd}
            aria-label="Increment"
          >
            <span className="icon">+</span>
          </button>
        </div>

        <p className="hint">Tap and hold buttons for continuous change. Press R to reset, T to toggle theme.</p>
      </div>
    </div>
  );
}

export default App2;