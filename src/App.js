import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [All, setAll]=  useState(0)
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);


  const CounterDown = ()=>{
    intervalRef.current = setInterval(() => {
        setAll((prevSeconds) => prevSeconds - 1);
    }, 1000);
  }

  const startHandler = () => {
    setAll(minutes*60 + seconds*1)
    setIsRunning(true);
    CounterDown()
  };

  const resumeHandler = () => {
    clearInterval(intervalRef.current);
    setIsRunning(true);
    CounterDown()
  };

  const pauseHandler = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setAll(0)
  };

  useEffect(()=>{
    if (All < 1) {
      clearInterval(intervalRef.current);
    }
  },[All])


  return (
    <>
      <label>
        <input type="number" value={minutes } onChange={(e) => setMinutes(e.target.value)} />
        Minutes
      </label>
      <label>
        <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
        Seconds
      </label>

      <button onClick={startHandler}>START</button>
      <button onClick={isRunning ? pauseHandler : resumeHandler}>
        {isRunning ? "PAUSE" : "RESUME"}
      </button>
      <button onClick={resetHandler}>RESET</button>

      <h1 data-testid="running-clock">
      {Math.trunc(All/60)}:{All%60}
      </h1>
    </>
  );
}

export default App;
