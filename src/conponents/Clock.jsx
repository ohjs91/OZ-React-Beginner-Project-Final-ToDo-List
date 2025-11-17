import { useEffect, useRef, useState } from "react";

// 시계
export default function Clock() {
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return <div className="card clock">{time.toLocaleTimeString()}</div>;
}
