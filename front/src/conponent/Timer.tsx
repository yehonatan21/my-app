import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  const formatTime = (milliseconds: number): string => {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const centisecs = Math.floor((milliseconds % 1000) / 10);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    const formattedCentisecs = centisecs < 10 ? `0${centisecs}` : centisecs;
    return `${formattedMins}:${formattedSecs}.${formattedCentisecs}`;
  };

  return (
    <>
      <div style={{ fontSize: 100 }}>{formatTime(time)}</div>
      <Stack spacing={2} direction="row">
        <Button onClick={handleStart} variant="outlined">
          Start
        </Button>
        <Button onClick={handleStop} variant="outlined">
          Stop
        </Button>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
      </Stack>
    </>
  );
};

export default Stopwatch;
