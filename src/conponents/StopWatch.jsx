import { useEffect, useRef, useState } from "react";

// 스탑워치
export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const intervalRef = useRef(null);
  const formatTime = (seconds) => {
    const timeString = `${zero(Math.floor(seconds / 3600))} : ${zero(
      Math.floor((seconds % 3600) / 60)
    )} : ${zero(seconds % 60)}`;
    return timeString;
  };
  function zero(item) {
    return String(item).length < 2 ? `0${item}` : String(item);
  }

  const resetTime = () => {
    setIsOn(false);
    setTime(0);
  };
  useEffect(() => {
    if (isOn) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isOn]);
  return (
    <>
      <div className="card stop_watch_wrap">
        <div className="stop_watch_display">{formatTime(time)}</div>
        <div className="stop_watch_btn_wrap">
          <button type="button" onClick={() => setIsOn((prev) => !prev)}>
            {isOn ? "끄기" : "켜기"}
          </button>
          <button type="button" onClick={resetTime}>
            리셋
          </button>
        </div>
      </div>
    </>
  );
}
