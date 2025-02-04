import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [otp, setOtp] = useState<number | null>(null);
  const [exp, setExp] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);

  const fetchData = () => {
    fetch("http://localhost:3000/JBSWY3DPEHPK3PXP")
      .then((response) => response.json())
      .then((data) => {
        setOtp(data.otp);
        setExp(data.exp);
      });
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(() => {
      fetchData();
      setTick((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getSecsTilRefresh = () => {
    return Math.max(0, Math.floor(exp - Date.now() / 1000));
  };

  return (
    <div>
      <p>OTP: {otp}</p>
      <progress
        id="progress-bar"
        value={getSecsTilRefresh()}
        max="30"
      ></progress>
    </div>
  );
}

export default App;
